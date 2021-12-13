const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const CLIENT_ID =
  "201276125151-nru0m9ldbf304vnnvhcfh3n6s3c50rjr.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL:
          "https://socialmediabyejoor.herokuapp.com/auth/google/waawsocial",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      function (accessToken, refreshToken, profile, cb) {
        let avatar = Array.from(profile._json.name);
        User.findOrCreate(
          {
            googleId: profile.id,
            email: profile._json.email,
            name: profile._json.name,
            userImage: profile._json.picture,
            initials: (avatar[0] + avatar[1]).toUpperCase(),
          },
          function (err, user) {
            return cb(err, user);
          }
        );
      }
    )
  );
};
