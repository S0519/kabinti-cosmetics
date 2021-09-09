const db = require('../models')
const config = require('../config/auth.config');
const ROLE =require('../config/role.config');
const jwt = require('jsonwebtoken');
const { request } = require('express');
const User = db.user;
const bcrypt = require('bcrypt');



signUp = (req,res)=>{
    const _user = new User({
        fullname:req.body.fullname,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8),
        isAdmin:req.body.role
    })
    _user.save((err,user)=>{
       if(err){
           res.status(500).send({message:err})
           return
       }
        res.status(200).send({
               message:"You are registered successfuly!"
        })
       
    })
}

signIn=(req,res,next)=>{
    User.findOne({email:req.body.email}).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        if(!user){
           return res.status(404).send({message:"user not found"});
        }
        const passwordIsValid= bcrypt.compareSync(req.body.password,user.password);
        if(!passwordIsValid){
            return res.status(404).send({
                accessToken:null,
                message:"Inavlid password"})
        }
        token = jwt.sign({id:user.id},config.secret,{expiresIn:86400})
        req.session.save(()=>{
            req.session.userId=user._id;
            req.session.userName=user.fullname;
            req.session.isLoggedIn = true;
            req.session.isAdmin = user.isAdmin;
            
            res.status(200).send({message:"you are successfully logged in!",isAdmin:user.isAdmin})
        })
    })
}
const logOut=(req,res)=>{
    if(req.session.isLoggedIn){
        delete req.session.userId;
        delete req.session.userName;
        delete req.session.isLoggedIn;
        delete req.session.isAdmin
        res.status(200).send({message:"user logged out successfuly!"})    
    }
    
}
const userCont = { 
    signUp,
    signIn,
    logOut
}
module.exports = userCont;