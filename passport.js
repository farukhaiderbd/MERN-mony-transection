const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('./model/User')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET';

module.exports = passport=>{
    passport.use(new JwtStrategy(opts,(payload,done)=>{
        User.findOne({_id:payload._id})
            .then(user=>{
                if(!user){
                    return done(null,false)
                }else{
                    done(null,user)
                }
            })
            .catch(error =>{
                done(error)
            })
    }))
}