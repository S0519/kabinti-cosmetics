const {adminCont} = require('../controllers');
const {signupHelpers} = require('../middlewares');
module.exports = function(app){
    app.use(function(res,req,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    
    app.get("/admin",[signupHelpers.checkAdmin],[adminCont.getDashboard]);
    app.get("/add-product",[signupHelpers.checkAdmin],(req,res)=>res.render('admin/add-product'));
    app.post("/add-product",[adminCont.addProduct]);
}