const mongoose = require('mongoose');

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        title:String,
        briefDesc:String,
        fullDesc:String,
        imageUrl:String,
        discount:Number,
        price:Number,
        quantity:Number,
        category:String
    })
)

module.exports = Product