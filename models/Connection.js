const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  travelerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  ambassadorId: {
    type: Schema.Types.ObjectId,
  ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Connection = mongoose.model("Connection", connectionSchema);

module.exports = Connection;
