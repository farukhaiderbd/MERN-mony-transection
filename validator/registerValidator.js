const validator = require('validator')

const validate = user=>{
    let errors = {}

    if(!user.name){
        errors.name = "please provide your name"
    }
    if(!user.email){
        errors.email = "please provide your Email"
    }else if(!validator.isEmail(user.email)){
        errors.email = "please provide a valid Email"
    }

    if(!user.password){
        errors.password = "please provide your Password"
    }else if(user.password.length < 6){
        errors.password = "Password must be at least 6 characters long"
    }

    if(!user.confirmPassword){
        errors.confirmPassword = "please provide your confirm password"
    }else if(user.password !== user.confirmPassword){
        errors.confirmpassword = "Password doesn\'t match"
    }
    
    return {
        errors,
        isValid: Object.keys(errors).length == 0
    }
}

module.exports = validate