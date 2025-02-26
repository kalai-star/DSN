const mongoose=require('mongoose')
const receiveSchema=mongoose.Schema({
    name: String,
    phoneNumber:Number,
    address:String,
    location:String 
}, { timestamps: true });
const receiveModel=new mongoose.model('receive',receiveSchema)
module.exports=receiveModel