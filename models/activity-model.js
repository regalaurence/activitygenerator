const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: String,
  description: String,
  url: [String],
  minDuration: Number,
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  categories: [String],
  timeWindowStart: Number,
  timeWindowEnd: Number,
  hasCost: Boolean,
  seasonStart: Date,
  seasonEnd: Date,
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
