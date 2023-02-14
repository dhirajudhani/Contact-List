const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    }
});

// Making a collection in which data base is store Naming convection always start with capital letter

const Contact = mongoose.model('Contact',contactSchema);

module.exports = Contact;