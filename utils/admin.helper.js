const db = require("../app/models");
const User = db.user;

const isAdminExist=(adminEmail)=>{
    let isAdmin;
    User.find({email:adminEmail})
    .exec((err,user)=>{
        if(err){
            console.log(err)
        }
        if(user){
            isAdmin=true;
        }
        else{
            isAdmin=false;
        }
    })
    return isAdmin
}
module.exports={
    isAdminExist
}