const bcrypt = require('bcrypt')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const User = require('../model/User')
const {serverError, resourceError} = require('../util/error')
const jwt = require('jsonwebtoken');
module.exports ={

    register(req, res) {
        let {name,email,password,confirmPassword} = req.body
        let validate = registerValidator({email,name,password,confirmPassword})
        
        if(!validate.isValid){
            res.status(400).json(validate.errors)
        }else{
           
            User.findOne({email})
            .then(user => {
               if(user){
                resourceError(res, "Email already exists")
               }
              
                bcrypt.hash(password,11,(err,hash) => {
                    if(err){
                        serverError(res, error)
                    }
                    let user = new User({
                        name,
                        email,
                        password:hash,
                     })
                     user.save()
                        .then(user =>{
                            res.status(201).json({message:"User created successfully",user})
                        })
                        .catch(err =>serverError(res, err)
                        )
                })
            })
            .catch(error => serverError(res, error))
        }
    
    
    },

    login(req,res){
        let {email,password} = req.body
        let validate = loginValidator({email,password});
        if(!validate.isValid){
            res.status(400).json(validate.errors)
        }else{

            User.findOne({email})
                .then(user=>{
                    if(!user){
                        resourceError(res, "This Email doesn\'t exist")
                    }else{
                        bcrypt.compare(password,user.password,(err,result)=>{

                            if(err){
                                serverError(res, err)
                            }
                            if(!result){
                                resourceError(res, "password doesn\'t match")
                            }

                            let token = jwt.sign({
                                _id :user._id,
                                name:user.name,
                                email:user.email
                            }, "SECRET",{expiresIn: "2h"})

                            res.status(200).json({
                                message: "Login successfully",
                                token: `Bearer ${token}`
                            })

                        })
                    }
                   
                })
                .catch(err=> serverError(res, err))
        
        }
    }



}