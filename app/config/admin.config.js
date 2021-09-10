const db = require('../models');
const bcrypt = require('bcrypt');
const User = db.user;
const setAdmin=()=>{
    const adminEmail="admin1@domain.com"
    User.find({email:adminEmail})
    .exec((err,user)=>{
        if(err){
            console.log(err)
        }
        if(user.length!=0){
            console.log("admin exists!")
        }
        else{
            const adminProps=new User({
                fullname:"Admin1",
                email:adminEmail,
                password:bcrypt.hashSync("Admin@007",8),
                isAdmin:true
            })
            adminProps.save((err,user)=>{
               if(err){
                   console.log(err)
                    return
               }
                console.log("Admin is set.")
            })
        }
    })
   
    
}
module.exports = setAdmin