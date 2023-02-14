const express = require('express');
const path  = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();//to neead all functionality of express


app.use(express.urlencoded()); // using for parsing a contacts act as a middelware basically it reads a post data passed in a form and parse it
app.use(express.static('assets'))

// //Middelware1
// app.use(function(req,res,next){
//     req.myName = 'dhiraj';
//     // console.log('middelware 1 ')
//     next();
// });
// //Middelware2
// app.use(function(req,res,next){
//     console.log('my name from mw2',req.myName);
//     // console.log('middelware 2 ')
//     next();
// });

var contactList = [
    {
        name:'Dhiraj',
        phone:'1111111111'
    },
    {
        name:'Pooja',
        phone:'1123456789'
    },
    {
        name:'Dhiraj',
        phone:'1223233333'
    }
]

app.set('view engine','ejs'); //Setting a key-value pair view engine:ejs
app.set('views',path.join(__dirname,'views')); // join with views folder dynamically 

app.get('/',function(request,response){
    // console.log(__dirname)

    // response.send('<h2>Cool , it is running or it is?</h2>')
    // console.log('from get route controller', request.myName)

    Contact.find({}, function(err,contacts){
        if(err){
            console.log('error occured while fetching a data from db');
            return;
        }
        return response.render('home' , {
            title:"My contact list",
            contact_list:contacts
        }); 
        
    });
    
});
app.get('/practice',function(request,response){
    return response.render('practice',{title:"Hello"})
})

app.post('/create-contact',function(req ,res){ 
    // console.log(req.body)
    // return res.redirect('/practice') // redirect means take me to that page


    //Adding contact in contact list
    // contactList.push(
    //     {
    //         name:req.body.name,
    //         phone: req.body.phone
    //     }

    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    }, function(err,newContact){
        if(err){
            console.log('error occured');
            return;
        }
        console.log('********',newContact);
        return res.redirect('/');
    });
    
   
})

//For deleting a contact 
app.get('/delete-contact',function(req,res){
    // console.log(req.params);
    // console.log(req.query);


    //get query from url

    //get the id from quer in url
    let id = req.query.id;


    //find the contact in the db using id and delete
    // let contactIndex = contactList.findIndex( contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1); //splice => ef a=[1,2,3] if we need to delete 2 splice will rearrange a=[1,3] with proper index
    // }


    Contact.findByIdAndDelete(id,function(err){
        if(err){
        console.log('error occured');
        return;
        }
        return res.redirect('/');
    });
   
});

app.listen(port,function(err){
    if(err){
        console.log('error in running the server',err);
    }
    console.log('yup, my express server is running on port ',port);
});