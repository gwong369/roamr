//Require libraries
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const path = require("path")
const dotenv = require("dotenv").config()

//Require our db
const db = require("./models");

//Set app to express for use later
const app = express();
//Set the port to run server
const PORT = process.env.PORT || 3001;
const secret = process.env.SECRET || "password";


//Middleware and Passport
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "client", "build")))

//Requiring the routing files
require("./routes/apiRoutes")(app);
// SERVE UP STATIC ASSETS--usually on Heroku
if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));
}
// ADD routes--
// app.use(routes);

//We will use this whenever we post to /login
passport.use(new LocalStrategy(
  {usernameField: "email"},  // configuration for passport so it knows the email is actually username
  function(username, password, done) {
    //query Mongodb with our user model
    db.User.findOne({email: username}, function(err, result) {
        console.log(result)
        let hash = result.password;  //this is the stored password hash in mongo
        console.log(hash);
        console.log(password); //this is the password passed in from the form
        bcrypt.compare(password, hash, function(err, res) { //bcrypt hashes the form password and compares it to the hash we just queried
          if (res === true) {  //return the session if true, otherwise, don't return
            console.log(result);
            console.log('cats');
            return done(null, result); //TODO change this to ObjectId
          } else {
            return done(null, false);
          }
        })
      }
    )
  }
));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ambassador", { useNewUrlParser: true });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//Listener for the server
app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
