const collection = require('../utilities/connection');
let user = {}

user.generateId=()=>{
    return collection.getCollection().then(model=>{
        return model.find({}).then(data=>{
            let nId=data.length;
            return nId+1;
        })
    })
}

user.userLogin = (uName,uPass) => {
    return collection.getCollection().then( userColl => {
        return userColl.findOne({"uName" : uName}).then( data => {
            if(data){
                if( uPass == data['uPass']){
                    return data
                }else{
                    throw new Error("The password entered is incorrect!!")
                }
            }else{
                throw new Error("You are not registered.Please register to login"); 
            }
        })
    }) 
}

user.adminLogin = (uName,uPass) => {
    return collection.getCollection().then( userColl => {
            return userColl.find({}).then(data=>{
                 return data
        })
    })
}

user.userRegister=(registerData)=>{
    return collection.getCollection().then(model=>{
        return user.generateId().then(userId=>{
            let userObj = {
                "userId": userId,
                "uName": registerData.uName,
                "uPass": registerData.uPass
            }
            return model.findOne({"uName" : registerData.uName}).then( data => {
                if(!data){
                    return model.insertMany([userObj]).then(data=>{
                        if(data.length!=0){
                            return "Successfully Registered"
                        }
                        else{
                            throw new Error("Registration failed | Try again")
                        }
                    })
                }
                else {
                    throw new Error("You are already Registered Please login"); 
                }
            })
        })
    })
}

user.ChangePassword = (uName,uPass,nPass) => {
    return collection.getCollection().then( userColl => {
        return userColl.findOne({"uName" : uName}).then( data => {
            if(data){
                if( uPass == data['uPass']){
                    return userColl.updateOne({"uName" : uName},{$set:{uPass:nPass}}).then( res => {
                        if(res.nModified === 1){
                            return "Password Updated Successfully"
                        }
                    })
                }else{
                    throw new Error("your old password entered is incorrect!!")
                }
            }else{
                throw new Error("You are not registered.Please register First"); 
            }
        })
    }) 
}

user.userDelete = (uName) => {
    return collection.getCollection().then( userColl => {
        return userColl.deleteOne({"uName" : uName}).then( data => {
            return userColl.find({}).then(data=>{
                return data
       })
        })
    }) 
}




module.exports = user