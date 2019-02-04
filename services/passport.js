const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});
//the user param in the serializeUser is the user instance passed from the done callback in the GoogleStategy

passport.deserializeUser((id, done)=>{
  User.findById(id)
  .then((user) =>{
    done(null, user);
  });
});

passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
      // proxy : true -- will enable googleStrategy to trust heroku proxy server and return HTTPS instead of HTTP 
    },
    // (accessToken, refreshToken, profile, done) => {
    //   console.log('accessToken:',  accessToken);
    //   console.log('refreshToken:', refreshToken);
    //   console.log('profile details:', profile);

    //   User.findOne({ googleId: profile.id })
    //     .then((existingUser) =>{
    //       if(existingUser){
    //         //we have a record with the given profileId
    //         // tell passport that we have finished creating the user and it should resume with auth process
    //         //using the 'done' function, params-> (error message, userRecord)
    //         done(null, existingUser);
    //       } else{
    //         // we dont have a record with the given profileID
    //         // make a new mongoose model instance
    //         // since saving a record is async, so we chain a .then to make sure we get a success notification
    //         new User({googleId: profile.id})
    //         .save()
    //         .then(user => done(null, user));
    //         // inside the then clause, in the callback, we get another model instance, so we have two instances
    //         // and they both represent the exact same record inside our collection, but by convention we use the 
    //         // one inside our callback as thats newer, i.e. after the saving process 
    //       }
    //     });
    // }
    async (accessToken, refreshToken, profile, done) => {
      console.log('accessToken:',  accessToken);
      console.log('refreshToken:', refreshToken);
      console.log('profile details:', profile);

      const existingUser = await User.findOne({ googleId: profile.id });
        
      if(existingUser){
        done(null, existingUser);
      } else{
        const user = await new User({googleId: profile.id}).save()
        done(null, user);
      }
    }
  )
);