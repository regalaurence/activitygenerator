const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const activitySchema = new Schema({
  name: String,
  minDuration: Number,
  creator:{type: Schema.Types.ObjectId, ref: 'User'},
  categories: [String],
  timeWindowStart: Date,
  timeWindowEnd: Date,
  hasCost: Boolean,
  seasonStart: Date,
  seasonEnd: Date
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;