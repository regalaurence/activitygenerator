const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  preferences: [String],
  bookmarkedActivities:[{type: Schema.Types.ObjectId, ref: 'Activity'}],
  activityCounter: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;