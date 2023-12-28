import passport from "passport";
import jwt from 'passport-jwt';
import { PRIVATE_KEY } from "../utils.js";
// import usersModel from "../dao/dbManagers/models/users.models.js";
// import GitHubStrategy from 'passport-github2';
// import config from "./config.js";


const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
// const GIT_SECRETE = config.gitSecrete;

const intializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async(jwt_payload, done) =>{
    try {

        return done(null, jwt_payload.user,null ); // req.user
    } catch (error) {
        return done(error)
    }
    }));

    // passport.use('github', new GitHubStrategy({
    //     session:false,
    //     clientID: 'Iv1.6b11166cca03c44c',
    //     clientSecret: GIT_SECRETE,
    //     callbackURL:  'http://localhost:8080/api/sessions/github-callback',
    //     scope: ['user:email']
    // }, async(accessToken, refreshToken, profile, done ) => {//lo siguente se ejecuta una vez authenticados en git hub
    //     try {

    //         const email = profile.emails[0].value;

    //         const user = await usersModel.findOne({email});

    //         if(!user){
    //             const newUser = {
    //                 first_name: profile._json.name ? profile._json.name : profile._json.login,
    //                 last_name : '',
    //                 age: 5,
    //                 email,
    //                 password: '',
    //                 cart: cart._id,
    //                 rol: 'User'
    //             };
            
    //             const result = await usersModel.create(newUser);
    //             console.log(result)
    //             return done(null, result);
    //         }else{
    //             console.log(user)

    //             return done(null, user);
    //         }

    //     } catch (error) {
    //         return done(error);
    //     }
    // }))
};

    
    const cookieExtractor = req => {
        let token = null;
        if(req && req.cookies) {
            token = req.cookies['CookieToken'];
        }
        return token;
    }

export default intializePassport;


