const db = require('../models')
const stripe = require("stripe")("sk_test_51JVXTVKQYCASxzWJj6jC8qKrRJS0YoOZNWOo8J1o7eCzYufVJgG5N8oGwXPChFRYprbmCjadANLe31GqgpcefjvG00zFasUxoR")
const Product = db.product;
const Order= db.order;
const onLoadCheckout=(req,res)=>{
    if(req.session.isLoggedIn){
        res.render('checkout')
    }
    else{
        res.render('errors/unauthorised')
    }

}
const createPaymentIntent=async(req,res)=>{
     // Create a PaymentIntent with the order amount and currency
     const paymentIntent = await stripe.paymentIntents.create({
        amount:req.session.cart.totalPrice+"00",
        currency: "usd"
      });
      res.send({
        clientSecret: paymentIntent.client_secret
      });
}
const makeCheckout=(req,res)=>{
    const address={
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        zip:req.body.zip
    }
    const _order= new Order({
        user:req.session.userId,
        cart:req.session.cart,
        address:address,
        name:req.session.userName,
        email:req.body.email
    })
    _order.save((err,result)=>{
        if(err){
            res.status(500).send({message:err});
        }
        else{
            delete req.session.cart;
            res.status(200).send({message:"Your order placed successfuly!"});
        }
    })
}
const checkoutCont={
    onLoadCheckout,
    createPaymentIntent,
    makeCheckout
}
module.exports=checkoutCont;