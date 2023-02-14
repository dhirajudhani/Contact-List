
//Require the library
const mongoose = require('mongoose');

//connect to the database 
mongoose.connect('mongodb://localhost/contacts_list_db');

//acquire the connection
const db = mongoose.connection; // db is use for accessing database


//error
db.on('error',console.error.bind(console,'error connecting to db'));

//running
db.once('open',function(){
    console.log('success');
});