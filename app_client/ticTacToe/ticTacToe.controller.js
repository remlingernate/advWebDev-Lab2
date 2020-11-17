(function() {
    angular
        .module('blogApp')
        .controller('ticTacToeCtrl', tttCtrl);

    function tttCtrl(authentication, $window, ticTacToe, $interval, $scope) {
        var vm = this;
        var currentUser = authentication.currentUser();
        vm.currentUserEmail = currentUser == null ? "" : currentUser.email;
        vm.gameOver = false;
        vm.winner = '';

        if (!authentication.isLoggedIn()) {
            $window.location.assign('/blog/list');
        }

        vm.checkLine = function(a, b, c) {
            return vm.data.gameState.board[a] == vm.data.gameState.board[b] && vm.data.gameState.board[b] == vm.data.gameState.board[c];
        };

        vm.checkGame = function() {
            var winner = '';
            vm.winner = '';

            if (vm.checkLine(0, 1, 2)) {
                winner = vm.data.gameState.board[0];
            } else if (vm.checkLine(3, 4, 5)) {
                winner = vm.data.gameState.board[3];
            } else if (vm.checkLine(6, 7, 8)) {
                winner = vm.data.gameState.board[6];
            } else if (vm.checkLine(0, 3, 6)) {
                winner = vm.data.gameState.board[0];
            } else if (vm.checkLine(1, 4, 7)) {
                winner = vm.data.gameState.board[1];
            } else if (vm.checkLine(2, 5, 8)) {
                winner = vm.data.gameState.board[2];
            } else if (vm.checkLine(0, 4, 8)) {
                winner = vm.data.gameState.board[0];
            } else if (vm.checkLine(2, 4, 6)) {
                winner = vm.data.gameState.board[2];
            }

            if (winner == '') {
                var emptySpaces = vm.data.gameState.board.includes('');
                return !emptySpaces;
            } else {
                vm.winner = winner == 'X' ? vm.data.gameState.playerOne : vm.data.gameState.playerTwo;
                return true;
            }
        };

        ticTacToe.getByPlayer(authentication.currentUser().email)
            .then(
                function successCallback(response) {
                    vm.data = {
                        title: "Play Tic-Tac-Toe",
                        gameState: response.data
                    };
                    vm.gameOver = vm.checkGame();
                },
                function errorCallback(response) {
                    vm.data = {
                        title: "Play Tic-Tac-Toe",
                        gameState: {
                            board: null
                        }
                    };
                    vm.gameOver = false;
                    vm.winner = '';
                }
            );

        $scope.callAtInterval = function() {
            if ($window.location.pathname == '/play') {
                ticTacToe.getByPlayer(authentication.currentUser().email)
                    .then(
                        function successCallback(response) {
                            vm.data = {
                                title: "Play Tic-Tac-Toe",
                                gameState: response.data
                            };
                            vm.gameOver = vm.checkGame();
                        },
                        function errorCallback(response) {
                            vm.data = {
                                title: "Play Tic-Tac-Toe",
                                gameState: {
                                    board: null
                                }
                            };
                            vm.gameOver = false;
                            vm.winner = '';
                            return;
                        }
                    );
            }
        };
        $interval(function() { $scope.callAtInterval(); }, 2000, 0, true);

        vm.takeTurn = function(place) {
            vm.formError = '';
            if (vm.currentUserEmail != vm.data.gameState.currentPlayer) {
                vm.formError = "It isn't your turn. Please wait.";
            } else {
                if (vm.data.gameState.board[place] != '') {
                    vm.formError = "Now, you know you can't choose that square. It's already taken!";
                    return;
                }
                if (vm.gameOver) {
                    return;
                }
                ticTacToe.takeTurnById(vm.data.gameState._id, place + 1)
                    .then(
                        function successCallback(response) {
                            vm.data = {
                                title: "Play Tic-Tac-Toe",
                                gameState: response.data
                            };
                            vm.gameOver = vm.checkGame();
                        },
                        function errorCallback(response) {
                            vm.formError = "Something went wrong saving your turn. Try again.";
                        }
                    );
            }

        };

        vm.newGame = function() {
            var opponentEmail = vm.data.gameState.playerOne == vm.currentUserEmail ? vm.data.gameState.playerTwo : vm.data.gameState.playerOne;
            vm.formError = '';

            ticTacToe.deleteByPlayer(vm.currentUserEmail)
                .then(
                    function successCallback(response) {
                        vm.doStartGame(opponentEmail);
                    },
                    function errorCallback(response) {
                        vm.formError = "Something went wrong resetting the game. Try again.";
                    }
                );
        };

        vm.forfeitGame = function() {
            vm.formError = '';

            ticTacToe.deleteByPlayer(vm.currentUserEmail)
                .then(
                    function successCallback(response) {
                        vm.data = {
                            title: "Play Tic-Tac-Toe",
                            gameState: {
                                board: null
                            }
                        };
                        vm.gameOver = false;
                        vm.winner = '';
                        vm.opponentEmail = '';
                    },
                    function errorCallback(response) {
                        vm.formError = "Something went wrong forfeiting the game. Try again.";
                    }
                );
        };

        vm.startGame = function() {
            vm.formError = '';

            if (!vm.opponentEmail) {
                vm.formError = "Please input the email address of the user you would like to play.";
                return false;
            } else if (vm.opponentEmail == vm.currentUserEmail) {
                vm.formError = "You can't play yourself, silly. Try again with someone else.";
            } else {
                authentication.isValidUser(vm.opponentEmail)
                    .then(
                        function successCallback(response) {
                            if (response.data.valid) {
                                console.log(vm.opponentEmail);
                                vm.doStartGame(vm.opponentEmail);
                            } else {
                                vm.formError = vm.opponentEmail + " is not a valid user. Try again.";
                            }
                        },
                        function errorCallback(response) {
                            console.log(response);
                            vm.formError = "Something went wrong checking for the user specified. Try again.";
                        }
                    );
            }
        };

        vm.doStartGame = function(opponentEmail) {
            vm.formError = '';

            ticTacToe.getByPlayer(opponentEmail)
                .then(
                    function successCallback(response) {
                        vm.formError = opponentEmail + " is already playing a game of Tic-Tac-Toe";
                    },
                    function errorCallback(response) {
                        var currentUser = authentication.currentUser().email;

                        ticTacToe.createByPlayers(currentUser, opponentEmail)
                            .then(
                                function successCallback(response) {
                                    vm.data = {
                                        title: "Play Tic-Tac-Toe",
                                        gameState: response.data
                                    };
                                    vm.gameOver = false;
                                    vm.winner = '';
                                },
                                function errorCallback(response) {
                                    vm.formError = "Something went wrong starting the game. Try again.";
                                }
                            );
                    }
                );
        };
    }
})();