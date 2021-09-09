const mongoose = require('mongoose');

const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
        user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        cart:{type:Object,required:true},
        address:{type:Object,required:true},
        name:{type:String,required:true},
        email:{type:String,require:true}
    })
)

module.exports = Order