const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  preferences: [String],
  bookmarkedActivities: [{
    originalID: String,
    name: String,
    description: String,
    url: [String],
    minDuration: Number,
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    categories: [String],
    timeWindowStart: Number,
    timeWindowEnd: Number,
    hasCost: Boolean,
    isHighPriority: Boolean,
    seasonStart: Date,
    seasonEnd: Date,
  }],
  activityCounter: Number,
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
