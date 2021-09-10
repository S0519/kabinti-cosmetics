const {userCont} = require('../controllers');
const {signupHelpers} = require('../middlewares')
module.exports = function(app){
    app.use(function(res,req,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    
    app.post("/api/user/signup",[signupHelpers.checkUserEmail],[userCont.signUp]);
    app.post("/api/user/signin",[userCont.signIn]);
    app.get("/api/user/logout",[userCont.logOut])
    }