/*  EXPRESS */
const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

// app.set("view engine", 'react');

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(cors());

app.get("/", function (req, res) {
  res.json("pages/auth", "working!");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("App listening on port " + port));

var passport = require("passport");
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get("/success", (req, res) => {
  res.json(200, { user: userProfile });
});
app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("http://localhost:3000");
  }
);
