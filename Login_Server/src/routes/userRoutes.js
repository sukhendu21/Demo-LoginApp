const express = require("express");
const userRouting = express.Router();
const userService = require('../service/user');
const UserData= require('../model/userdata');

//User Login
userRouting.post('/login', (req,res,next)=>{
    var uName= req.body.userName;
    var uPass=req.body.password;
    return userService.loginUser(uName, uPass).then(userData => {
        res.json(userData);
    }).catch(err => {
        console.log(err.message)
        next(err);
    });
});
//Admin Login
userRouting.post('/adminLogin', (req,res,next)=>{
    var uName= req.body.userName;
    var uPass=req.body.password;
    return userService.adminLogin(uName, uPass).then(userData => {
        res.json(userData);
    }).catch(err => {
        console.log(err.message)
        next(err);
    });
});
//User Registration
userRouting.post('/register', (req,res,next)=>{
    const registerData=new UserData(req.body);
    return userService.RegisterUser(registerData).then(userData => {
        res.json(userData);
    }).catch(err => {
        console.log(err.message)
        next(err);
    });
});
//User Password Change
userRouting.post('/newPassword', (req,res,next)=>{
    var uName= req.body.userName;
    var uPass=req.body.password;
    var nPass=req.body.newPassword;
    return userService.ChangePassword(uName, uPass,nPass).then(userData => {
        res.json(userData);
    }).catch(err => {
        console.log(err.message)
        next(err);
    });
});
//User Deletion by Admin
userRouting.put('/delete', (req,res,next)=>{
    var uName= req.body.uName;
    return userService.userDelete(uName).then(userData => {
        res.json(userData);
    }).catch(err => {
        console.log(err.message)
        next(err);
    });
});

module.exports = userRouting