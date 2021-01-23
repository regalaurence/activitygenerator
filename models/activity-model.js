const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const activitySchema = new Schema({
  name: String,
  minDuration: Number,
  creator:{type: Schema.Types.ObjectId, ref: 'User'},
  categories: [],
  startTime: [Date],
  endTime: [Date],
  cost: Boolean,
  weather: [Date]
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;