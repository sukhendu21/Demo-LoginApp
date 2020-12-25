const data=require("../model/User.json")
let Validator = {}

Validator.validateAdmin = (uName,uPass) => {
    if (uName!=data.userName) {
        throw new Error("Wrong Username Entered");
    }
    else if(uPass!=data.password){
        throw new Error("Wrong password Entered");
    }
}

module.exports = Validator;