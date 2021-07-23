const passport = require('passport')

module.exports =(req, res, next) => {

    passport.authenticate('jwt',(err,user,info)=>{
        if(err){
            console.log(err)
            console.log(info)
            return next(err)
        }
        if(!user){
            res.status(400).json({
                message:'Authentication failed'})
        }
        req.user = user
        next()
    })(req, res, next)

}