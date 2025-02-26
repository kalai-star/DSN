const express=require('express')
const router=express.Router()
const userModel=require('../Models/userModel')
const bcrypt=require('bcryptjs')
const nodemailer=require('nodemailer')
const jwt=require('jsonwebtoken')
const bodyParser=require('body-parser')
router.use(bodyParser.json())
router.post('/signup',async(req,res)=>{  
  try{
    const{username,email,password}=req.body
    const emailFound=await userModel.findOne({email})
    if(emailFound){return res.status(201).json({message:"Email already registered"})}
    const hashedPassword=await bcrypt.hash(password,10)
    let users=new userModel({
      username,email,password:hashedPassword})
      users.save()
      const transport=nodemailer.createTransport({
        host:'sandbox.smtp.mailtrap.io',
        port:2525,
        auth:{
          user:process.env.EMAIL,
          pass:process.env.PASSWORD
        }
      })
      const token=jwt.sign({email},process.env.SECRET_KEY,{expiresIn:'1h'})
      const verificationLink=`http://localhost:3005/users/verify/${token}`
      transport.sendMail({
        from:process.env.EMAIL,
        to:email,
        subject:"Verification Email from APP NAME",
        html:`<a href=${verificationLink}>Verify on clicking this link</a>`
      })
res.status(200).json({message:"Signup Successfull and Activation link is sent"})
    }
    catch(err){
      res.status(500).json({message:err})
    }
  })
  router.get('/verify/:token',async(req,res)=>{
    try{
      const{token}=req.params
      const decoded=jwt.verify(token,process.env.SECRET_KEY)
      const user=await userModel.findOne({email:decoded.email})
      if(!user){return res.status(404).json({message:"Invalid token"})}
      user.isVerified=true
      user.save()
      res.status(200).json({message:"Verification Succesfull"})
    }
    catch(err){
      res.status(500).json({message:"Server Error",err})
    }
  })
  module.exports=router