const { compareSync } = require('bcrypt');
const db = require('../models');
const Category = require('../models/category.model');
const Product = db.product;
const category = db.category;
const getHomeProducts=(req,res)=>{
    Product.find({})
    .sort({_id:1})
    .limit(4)
    .lean()
    .exec((err,products)=>{
        if(err){
            res.status(500).send({message:err})
        }
        else{
            res.render("index",{products})
        }
    })
}

const getProductsByCategory=(req,res)=>{
    const category = req.params.category;
    const filter = req.params.category=="all"?{}:{category:category}
    Product.find(filter)
    .sort({_id:1})
    .limit(20)
    .lean()
    .exec((err,products)=>{
        if(err){
            res.status(500).send({message:err})
        }
        else{
            Category.find({})
            .lean()
            .exec((err,categoryList)=>{
                if(err){
                    res.status(500).send({message:err})
                } 
                res.render("products",{products,categoryList})
            })
        }
    })
}
const commonCont={
    getHomeProducts,
    getProductsByCategory
}
module.exports=commonCont;