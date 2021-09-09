const {checkoutCont} = require('../controllers');
const Cart = require('../../utils/cart');
module.exports = function(app){
    app.use(function(res,req,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    
    app.get('/checkout',[checkoutCont.onLoadCheckout]);
    app.post("/create-payment-intent",[checkoutCont.createPaymentIntent]);
    app.post("/checkout",[checkoutCont.makeCheckout]);
    
    }