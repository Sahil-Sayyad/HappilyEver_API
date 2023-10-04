const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  wardenId: String,
  day: String,
  time: String,
  bookedBy: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
});

module.exports = mongoose.model("Session", sessionSchema);