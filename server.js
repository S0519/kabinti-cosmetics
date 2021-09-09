const express = require('express');
const dbConfig = require('./app/config/db.config')
const db = require('./app/models')
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const helpers = require('./utils/helpers');
const hbs = require('express-handlebars');
const { response } = require('express');
const exphbs = hbs.create({helpers});
const mongoStore =require('connect-mongo');
const setAdmin = require('./app/config/admin.config');


db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`successfuly connected to ${dbConfig.DB}`)
}).catch((err)=>{
    console.log(`Connection error : ${err}`)
    process.exit()
})

// cors setup
const corsOption={
    origin:"http://localhost:8080"
}
app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,"public")))

// insert admin

setAdmin();

// session setup
app.use(session({
    name:'kabinti-session',
    secret:`my-secret-session`,
    resave:false,
    saveUninitialized:false,
    store:mongoStore.create(
        {mongoUrl:`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
        ttl:180 * 60 * 1000,
        collectionName:"kabinti-sessions"
    })
}))
//user interface template setting
app.engine("handlebars",exphbs.engine);
app.set("view engine","handlebars");

// make session available to template
app.use((req,res,next)=>{
        res.locals.session = req.session;
        next();
})

// routes

require('./app/routes/common.route')(app);
require('./app/routes/user.route')(app);
require('./app/routes/cart.route')(app);
require('./app/routes/product.route')(app);
require('./app/routes/checkout.route')(app);
require('./app/routes/admin.route')(app);

// server setup
const PORT= process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})

module.exports = app;