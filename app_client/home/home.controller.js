(function () {
  angular
    .module('blogApp')
    .controller('homeCtrl', homeCtrl);

  function homeCtrl () {
    var vm = this;
    
    vm.title = 'Nate Remlinger Blog Site'
  } 
}) ();
