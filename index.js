const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

const app = express();

//app.use calls wires up the middleware(small functions to modify incomming req)
app.use(
    cookieSession({
       maxAge: 30* 24* 60* 60* 1000,
       keys: [keys.cookieKey]
    })
);
//cookieSession takes the (id) and passes to it to (req.session), from there passport takes and passes it 
//to serialize/deseriaizeUser
//we are calling the cookie-session with a with a configuration object, 
//conf. obj expects two differnet properties
//maxAge(in miliseconds): how long the cookie can exist in the browser before it is automatically expired
//keys: used to encrypt our cookie, an array of keys can be passed from which random key will be picked

app.use(passport.initialize());
app.use(passport.session());
//tell passport to use cookie for authentication

// app.get('/', (req, res) =>{
//     res.send({ hi: 'there' });
// } );

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
