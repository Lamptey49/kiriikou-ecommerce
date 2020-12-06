const mongoose = require('mongoose')
const BusinessSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required: true,
        trim:true
    },
    lastname:{
        type:String,
        required: true,
        trim:true
    },
    email:{
        type:String,
        trim: true,
        unique: 'Email already exists',
    },
    country:{
        type:String,
        required: true,
        trim:true
    },
    region:{
        type:String,
        required: true,
        trim:true
    },
    suburb:{
        type:String,
        required: true,
        trim:true
    },
    zip:{
        type:String,
        trim:true
    },
    phone_one:{
        type:String,
        required: true,
        trim:true
    },
    phone_two:{
        type:String,
        required: true,
        trim:true
    },
    business_name:{
        type:String,
        required: true,
        trim:true
    },
    busines_site_url:{
        type:String,
        trim:true
    },
    country_of_business:{
        type:String,
        required: true,
        trim:true
    },
    region_of_business:{
        type:String,
        required: true,
        trim:true
    },
    city_of_business:{
        type:String,
        required: true,
        trim:true
    },
    business_mobile:{
        type:String,
        required: true,
        trim:true
    },
    business_mobile_contact:{
        type:String,
        trim:true
    },
    business_email:{
        type:String,
        required: true,
        trim:true
    },
    is_business_registered:{
        type:Boolean,
        required:true
    },
    busines_certificate:{
        data:Buffer,
        contentType:String
    },
    identity_card_front:{
        data:Buffer,
        contentType:String
    },
    identity_card_back:{
        data:Buffer,
        contentType:String
    },
    rate: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
    }],
    postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},
    paid_for_service :{ type: Boolean},
    owner:{ type: mongoose.Schema.ObjectId, ref: 'User'}
});

module.exports= mongoose.model('Business', BusinessSchema)