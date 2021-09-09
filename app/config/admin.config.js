const db = require('../models');
const bcrypt = require('bcrypt');
const User = db.user;

const setAdmin=()=>{
    const adminProps=new User({
            fullname:"Admin1",
            email:"admin1@domain.com",
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
module.exports = setAdmin