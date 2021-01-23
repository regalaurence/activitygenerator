const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  preferences: [String],
  bookmarkedActivities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  activityCounter: Number,
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
