const { compareSync } = require('bcrypt');
const db = require('../models');
const Cart = require('../../utils/cart');
const Order = db.order;
const Product = db.product;

const addToCart=(req,res)=>{
    const productId=req.body.productId;
    const cart = new Cart(req.session.cart?req.session.cart:{})

    Product.find({_id:productId})
    .lean()
    .exec((err,result)=>{
        if(err){
            res.status(500).send({message:err});
        }
        const product = result[0];
        cart.add(product,product._id);
        req.session.cart=cart;
        res.status(200).send({message:"Product added successfuly!"})
    })
   
}
const getCart=(req,res)=>{
    if(!req.session.cart){
        console.log("I am hit")
        res.render('cart',{products:[]})
    }
    else{
        const cart=new Cart(req.session.cart)
        res.render('cart',{products:cart.constructCart()})
    
    }
}
const updateQuantity=(req,res)=>{
    const cart = new Cart(req.session.cart?req.session.cart:{})
    cart.updateQuantity(req.body.quantity,req.body.id);
    req.session.cart=cart;
    res.render('cart',{products:cart.constructCart()})
}
const deleteCartItem=(req,res)=>{
    const itemId = req.params.id;
    const cart = new Cart(req.session.cart?req.session.cart:{})
    cart.deleteItem(itemId);
    req.session.cart=cart;
    res.render('cart',{products:cart.constructCart()})
}
const cartCont ={
    addToCart,
    getCart,
    updateQuantity,
    deleteCartItem
}
module.exports=cartCont;