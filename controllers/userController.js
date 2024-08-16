const User = require("../models/userModel")
const bcrypt=require('bcryptjs')

const loginController=async(req, res)=>{
    try {
        const {email, password}=req.body
        if(!email || !password){
            return res.status(401).send({
                 success:false,
                 message:'Please provide email and password!'
            })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(401).send({
                success:false,
                message:'user is not registered!'
            })
        }
        
        const isMatch=await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:'Invalid username or password!'
            })
        }
       
       return res.status(200).json({
            success:true,
            user,
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}

const registerController=async(req,res)=>{
    try {
        const {name, email, password} = req.body
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(401).send({
                success:false,
            
            })
        }
      const hashedPassword=await bcrypt.hash(password, 10)
        const user=new User({name, email, password:hashedPassword})
        await user.save()
        return res.status(201).json({
            success:true,
            user
        })
    
    } catch (error) {
        res.status(400).json({
            success:false,
            error
        })
    }
}

module.exports={loginController, registerController}