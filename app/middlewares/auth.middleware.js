const db = require('../models')
const User = db.user;
checkUserEmail=(req,res,next)=>{
        User.findOne({email:req.body.email})
        .exec((err,user)=>{
            if(err){
                res.status(500).send({message:err});
                return;
            }
            if(user){
                res.status(400).send({message:'Email already is in use'});
                return;
            }
            next()
        })
    
}
checkLogin=(req,res,next)=>{
    if(!req.session.isLoggedIn){
        res.status(403).send({message:"Please login to proceed"})
    }
    else{
        next();
    }
    
}
checkAdmin=(req,res,next)=>{
    if(!req.session.isAdmin){
        res.status(403).send({message:"Ooops! Only admin can access the page."})
    }
    else{
        next();
    }
}
const signupHelpers = {
    checkUserEmail,
    checkLogin,
    checkAdmin   
}
module.exports= signupHelpers;
