const { Schema } = require('mongoose');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = "mongodb://127.0.0.1:27017/My-App"

const usersSchema = Schema({
    userId : {type : Number, required : [true, 'userId is required']},
    uName : {type : String, required : [true, 'uName is required']},
    uPass  : {type : String, required : [true, 'uPass is required']}
}, {collection : "Users", timestamps: true });

let connection = {}

//Returns model object of "Users" collection
connection.getCollection = () => {
    //establish connection and return model as promise
    return mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true}).then( database => {
        return database.model('Users', usersSchema)
    }).catch( error => {
        let err = new Error("Could not connect to the database");
        err.status = 500;
        throw err;
    });
}

module.exports = connection;