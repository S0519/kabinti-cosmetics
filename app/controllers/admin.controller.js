const db = require('../models');
const Order = db.order;

const getProducts=(req,res)=>{

}
const addProduct=(req,res)=>{
    
}
const getDashboard=(req,res)=>{
    Order.find({})
    .sort({_id:1})
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

const adminCont ={
    addProduct,
    getDashboard,
    getProducts
}
module.exports=adminCont;