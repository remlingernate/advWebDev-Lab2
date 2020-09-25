# Blog App for CSCI 406 - Advanced Web Dev
A simple blog web app that will be built over time as a class assignment. Makes use of the MEAN stack, with EJS as its templating engine of choice.

## Installation
After cloning this repo, navigate to the project's root directory and run

> npm install 

to install the dependencies of this project.

### Note
The database connection URI is provided to the program in /app_api/models/db.js.

> var dbURI = 'mongodb://\<username\>:\<password\>@localhost/\<DB\>';
  
Ensure you have set up your database with a username/password to allow proper access/permissions, and make the necessary changes to the dbURI variable before proceeding.

## Running the app
After installing all dependencies, navigate to the project's root directory and run

> sudo node ./bin/www

to start the web app. Doing so will start the application on port 80 of your machine. Use a browser to navigate to the address of the machine the web app is running on to see the application in action.
