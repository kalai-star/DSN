const mongoose=require('mongoose')
const donateSchema=mongoose.Schema({
    donorName:String,
    phoneNumber:Number,
    address:String,
    items:[
        {
            itemsName:String,
            quantityUnit:String,
            quantity:Number
        }
    ]
})
const donateModel=new mongoose.model('donation',donateSchema)
module.exports=donateModel