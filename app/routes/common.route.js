const {commonCont} = require('../controllers');
const {cartHelpers} = require('../middlewares')
module.exports = function(app){
    app.use(function(res,req,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    
    app.get('/',[commonCont.getHomeProducts])
    app.get('/about',(req,res)=>res.render('about'))
    app.get('/products/:category',[commonCont.getProductsByCategory])
    app.get('/contact',(req,res)=>res.render('contact'))
    

}