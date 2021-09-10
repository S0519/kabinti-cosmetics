const db = require('../models');
const Product = db.product;

const addProduct = (req,res) =>{
    const product=new Product({
        title:req.body.title,
        briefDesc:req.body.briefDesc,
        fullDesc:req.body.fullDesc,
        imageUrl:req.body.imageUrl,
        discount:req.body.discount,
        price:req.body.price,
        quantity:req.body.quantity,
        category:req.body.category
    })
    
    product.save((err,result)=>{
        if(err){
            res.status(500).send({message:err});
        }
        else{
            res.status(200).send({message:"product added successfully"})
        }
    })
}

updateProduct=(req,res)=>{
    
}

const productCont = { 
    addProduct
}
module.exports = productCont;