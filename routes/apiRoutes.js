const db = require("../models");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

//Export routes
module.exports = function(app) {

  //Authentication
  //Logging in

  //Whenever you post to login, we run passport.authenticate.  This uses the local strategy
  //that we defined in the server code.

  app.post('/api/login', passport.authenticate('local'), function(req, res) {
      console.log("login successful");
      res.redirect('/profile');
    }
  );

  passport.serializeUser(function(userID, done){
    console.log("Serialized: User id is saved to the session file here")
    done(null, userID);
  });

  //deserialize the user
  passport.deserializeUser(function(userID, done){
    console.log("Deserialized: User id is saved to the session file here")
    done(null, userID);
  })

  //Registering
  app.post('/api/register', function(req, res) {
    let pass = req.body.password;
    //hash the password and patch in the db.  10 here is the number of salt rounds to use
    bcrypt.hash(pass, 10, function(err, hash) {
      db.User.create(
        {
          email: req.body.email,
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          zipCode: req.body.zipCode,
          interests: req.body.interests,
          languages: req.body.languages,
          phoneNumber: req.body.phoneNumber,
          ambassador: false
        })
        .then(function(response) {
          console.log(response);
          req.login(response, function(err) {
            if (err) {
              console.log("Error with the login function");
            }
            else {
              console.log("successfully(?) logged in, redirect to profile")
              return res.redirect('/profile');
            }
          })
        });
    });

  })

  app.get("/api/connections", (req, res) => {
    if (!req.user.ambassador) {
      db.User.findOne(
        {_id: req.user._id},
        'connections',
      ).then(function(r) {
        // connections array is r.connections
        console.log(r.connections);
        db.User.find(
          {_id: { $in: r.connections}}
        ).then(function(cResponse) {
          console.log(cResponse);
          let payload = {
            role: 'traveller',
            connections: cResponse
          }
          res.json(payload);
          })
      })
    }
    else {
      db.User.find(
        {connections: req.user._id}
      ).then(function(r) {
        let payload = {
          role: 'ambassador',
          connections: r
        }
        res.json(payload);
      })
    }
    });

  //route for getting all connections GET
  app.get("/api/connections", (req, res) => {
    db.User.find(
      {
        _id: req.user._id
      }
    ).then(function(r) {
      if (!r.ambassador) {
        db.Connection.find(
          {
            travelerId: req.user._id,
          }
      )
      .populate('users')
      .exec(function (e, trvConnections) {
        console.log(trvConnections);
          let payload = {
            role: 'traveller',
            connections: trvConnections
          }
          console.log("Found all your new best friends")
          console.log(payload);
          return res.json(payload);
      });
      }
      else {
        db.Connection.find(
          {
            ambassadorId: req.user._id,
          }
        ).then(function (ambConnections) {
          let payload = {
            role: 'ambassador',
            connections: ambConnections
          }
          console.log("Found all your new best friends")
          return res.json(payload);
        })
      }});
    });



  //route for new connection POST
  // app.post("/api/newconnection", (req, res) => {
  //   db.Connection.create(
  //     {
  //       travelerId: req.user._id,
  //       ambassadorId: req.body.ambassadorId
  //     }
  //   ).then(function(connection) {
  //     console.log("You made a new friend!")
  //   });
  // });

  app.post("/api/newconnection", (req, res) => {
    db.User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: {connections: req.body.ambassadorId} }
    ).then(function(updatedUser) {
      console.log("new friend, wow");
    })
  });

  //route for displaying user data on profile
  app.get("/api/profile", (req, res) => {
      console.log('please dont')
      console.log(req.user);
      db.User.find(
        {
          _id: req.user._id
        }
      ).then(function (user) {
          res.json(user);
      });
  });

  // route for location UPDATE
  app.patch("/api/locationupdate", (req, res) => {
      var id = req.user._id;

      var userLocation = req.body.newLocation;
      console.log(userLocation);
      console.log(req.body);
      db.User.findOneAndUpdate({_id: id}, {$set:{zipCode: userLocation}})
          .then(function (userUpdated) {
            console.log(userUpdated)
              console.log("The user: " + id +  " location was updated to: " + userUpdated.zipCode);
           });
  });
  // route for status(travelling vs ambassador) UPDATE
  app.patch("/api/statusupdate", (req, res) => {
      var id = req.user._id;

      var userStatus = req.body.status;
      console.log(req.body)
      console.log(userStatus)

      db.User.findOneAndUpdate({_id: id}, {$set:{ambassador: userStatus}})
          .then(function (userUpdated) {
            console.log(userUpdated)
            console.log("The User: " + id + " has changed their status to: " + userUpdated.ambassador + "!");
          });
  });
  //route for getting all ambassadors in location GET
  app.get("/api/feed", (req, res) => {
      db.User.find(
          {
              location: req.body.location,
              ambassador: true
          }
      ).then(function (users) {
          let payload = {
            me: req.user,
            userArray: users
          }
          console.log(payload);

          return res.json(payload);
      })
  });

  app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

  //Dummy route for testing
  app.get("*", (req, res) => {
      res.send("Hello")
  });
}
