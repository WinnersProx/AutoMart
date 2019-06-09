import dotenv from 'dotenv'
import passportJWT from 'passport-jwt'
import passport from 'passport'
import userModel from '../models/users'
dotenv.config()
const jwtStrategy = passportJWT.Strategy
const extractJWT = passportJWT.ExtractJwt
const opts = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey    : process.env.SECRET_KEY
}
const strategy  = new jwtStrategy(opts, (payload, next) => {
    const user = userModel.findById(payload.id)
    next(null, user)
})
passport.use(strategy)

export default passport