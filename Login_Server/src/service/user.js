const dbLayer = require('../model/user');
const Validator = require("../utilities/validator")
user = {}

//Verfying the credentials of user
user.loginUser = (uName,uPass) => {
    return dbLayer.userLogin(uName,uPass).then( response => {
        return response
    })
}

user.adminLogin = (uName,uPass) => {
    Validator.validateAdmin(uName,uPass)
    return dbLayer.adminLogin(uName,uPass).then( response => {
        return response
    })
}

user.RegisterUser = (registerData) => {
    return dbLayer.userRegister(registerData).then( response => {
        return response
    })
}

user.ChangePassword = (uName,uPass,nPass) => {
    return dbLayer.ChangePassword(uName,uPass,nPass).then( response => {
        return response
    })
}


user.userDelete = (uName) => {
    return dbLayer.userDelete(uName).then( response => {
        return response
    })
}

module.exports = user