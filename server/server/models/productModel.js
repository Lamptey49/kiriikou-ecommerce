const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productname:{
        type: String,
        trim:true,
        required:true
    },
    image:{
        data:Buffer,
        contentType:String
    },
    video:{
        data:Buffer,
        contentType:String
    },
    category:{
        type:String,
        default:'',
        enum:[
            'Agriculture','Food & Beverages',
            'Fashion & Clothing', 'Art & Craft',
            'Beauty', 'Home & Decor', 'Automobiles',
            'Electrical Appliances', 'Phones & Computers',
            'Natural Resources' 
        ]
    },
    description:{
        type:String,
        trim: true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    sku:{
        type:String,
    },
    listoftheweek:{
        type:Boolean
    },
    updated:Date,
    created:{
        type:Date,
        default:Date.now
    },
    business:{ type: mongoose.Schema.ObjectId, ref: 'Business'}
});
module.exports = mongoose.model('Product', ProductSchema);