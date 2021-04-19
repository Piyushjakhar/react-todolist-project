const express = require('express');
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");
const User = require("./models/dbUser");

const cookieSession = require("cookie-session");

mongoose.connect(keys.mongodb.dbURI);

passport.use(new GoogleStrategy(
    {
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/redirect"
},
 (accessToken, refreshToken, profile, done) => {
     User.findOne({googleId: profile.id}).then((currentUser)=> {
         if (currentUser) {
             done(null,currentUser);
         }
         else {
             new User({
                 googleId: profile.id,
             }).save().then((newUser) => {
                 done(null, newUser);
             })
         }
     })
 }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });


  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
      done(null, user);
    });
  });


  const app = express();

const PORT = 3000;

  app.use(cookieSession({
    // milliseconds of a day
    maxAge: 24*60*60*1000,
    keys:[keys.session.cookieKey]
  }));

  app.get("auth/google/redirect",passport.authenticate("google"),(req,res)=>{
    res.send(req.user);
    res.send("you reached the redirect URI");
  });
  

  app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

app.get("/auth/google/redirect", passport.authenticate('google'));


app.use(passport.initialize());
app.use(passport.session());




  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });









app.get('/',(req,res) => {
    res.get("HELLO WORLD!!");
})

app.listen(PORT, () => {
    console.log(`server is up and running!! on PORT ${PORT}`);
})





