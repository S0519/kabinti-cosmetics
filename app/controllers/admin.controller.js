const db = require('../models');
const Order = db.order;
const Category = db.category;
const getProducts=(req,res)=>{

}
const addProduct=(req,res)=>{
    
}
const getDashboard=(req,res)=>{
    Order.find({})
    .sort({_id:-1})
    .lean()
    .exec((err,orders)=>{
        if(err){
            res.status(500).send({message:err})
        }
        else{
            res.render("admin/admin-dashboard",{orders:orders});
        }
    })
    
}
const addCategory=(req,res)=>{

    
    
    const category=new Category({
        name:req.body.name,
        imageUrl:req.body.imageUrl
    })
    category.save((err,result)=>{
       if(err){
            res.status(500).send({message:err})
        }
        else{
            res.status(200).send({message:"Category added successfuly!"})
        }
    })
}
const getProductView=(req,res)=>{
    Category.find({})
    .select("name")
    .lean()
    .exec((err,categoryList)=>{
        if(err){
            res.status(500).send({message:""})
        }
        else{
            res.render("admin/add-product.handlebars",{categoryList:categoryList});
        }
    })
}
const adminCont ={
    getDashboard,
    addCategory,
    getProductView
}
module.exports=adminCont;