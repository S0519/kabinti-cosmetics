const {cartCont} = require('../controllers');
const Cart = require('../../utils/cart');
module.exports = function(app){
    app.use(function(res,req,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    
    app.post("/api/cart/add",[cartCont.addToCart]);
    app.get('/cart',[cartCont.getCart])
    app.post('/api/cart/update-quantity',[cartCont.updateQuantity])
    app.delete('/api/cart/delete-item/:id',[cartCont.deleteCartItem])
    }