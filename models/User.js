const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
  ambassador: {
    type: Boolean,
    default: false
  },
  interests: [String],
  languages: [String],
  phoneNumber: String,
  profileURL: {
    type: String,
    default: "https://carolinabirds.org/Images5LG/Penguin,_Emperor_SamuelBlanc.jpg"
  },
  connections: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});


// firstName, lastName, zipCode, interests [array], languages [array], phoneNumber (not req), email (req), password (passport)

const User = mongoose.model("User", userSchema);
module.exports = User;
