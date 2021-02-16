const mongoose = require('mongoose');
const Activity = require('../models/activity-model');

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const activitiesSeeds = [{
  name: 'Go for a walk',
  description: "Oxygeneting this brain wouldn't hurt!",
  minDuration: '15',
  categories: ['Outdoor'],
  timeWindowStart: 7,
  timeWindowEnd: 21,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Try out a new recipe',
  description: 'If you have no inspiration, get a random recipe in the link below',
  url: ['http://www.dammitwhatdoyouwant.co.uk'],
  minDuration: '60',
  categories: ['Indoor', 'Cooking'],
  timeWindowStart: 8,
  timeWindowEnd: 22,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Listen to a playlist',
  description: 'Checkout your spotify suggestions, or just listen to our curated paylist.',
  url: ['http://www.spotify.com'],
  minDuration: '10',
  categories: ['Relaxing'],
  timeWindowStart: 0,
  timeWindowEnd: 24,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Watch a movie',
  description: "A good way to chose it to checkout the IMDB's top rated, and watch the first movie in the list you haven't watched yet.",
  url: ['https://www.imdb.com/chart/top/'],
  minDuration: '90',
  categories: ['Indoor'],
  timeWindowStart: 0,
  timeWindowEnd: 24,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Go for a run',
  description: 'Go slow, go fast. In the streets or at the parc. With music or not. It is all up to you.',
  minDuration: '30',
  categories: ['Outdoor', 'Sports'],
  timeWindowStart: 7,
  timeWindowEnd: 20,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Call or skype your parents',
  description: 'It is so obvious we tend to forget, right?',
  minDuration: '5',
  categories: ['Relaxing'],
  timeWindowStart: 9,
  timeWindowEnd: 21,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Take a bath',
  description: 'No bathtub at home? Find one!',
  minDuration: '15',
  categories: ['Relaxing'],
  timeWindowStart: 12,
  timeWindowEnd: 22,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Buy groceries for the week',
  description: "You'll find yourselve cooking more and save money.",
  minDuration: '60',
  categories: ['Housework'],
  timeWindowStart: 9,
  timeWindowEnd: 19,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Go sit at the park',
  description: 'On a bench or on the grass, with or awithout friends, we leave the details to you.',
  minDuration: '30',
  categories: ['Relaxing', 'Outdoor'],
  timeWindowStart: 10,
  timeWindowEnd: 21,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 3,
  seasonEnd: 8,
},
{
  name: 'Have a drink with a friend',
  description: 'Or several of them. Be spontenous, invite them over or meet out.',
  minDuration: '15',
  categories: ['Relaxing'],
  timeWindowStart: 16,
  timeWindowEnd: 22,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: "Call that friend you've been missing",
  description: 'That friend probably misses you too.',
  minDuration: '5',
  categories: ['Relaxing'],
  timeWindowStart: 9,
  timeWindowEnd: 22,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Clean the bathroom',
  description: "You don't like it? Spoiler alert: no one likes it.",
  minDuration: '30',
  categories: ['Housework'],
  timeWindowStart: 9,
  timeWindowEnd: 22,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Clean the fridge',
  description: "You don't like it? Spoiler alert: no one likes it.",
  minDuration: '30',
  categories: ['Housework'],
  timeWindowStart: 8,
  timeWindowEnd: 22,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Clean the oven',
  description: "You don't like it? Spoiler alert: no one likes it.",
  minDuration: '30',
  categories: ['Housework'],
  timeWindowStart: 8,
  timeWindowEnd: 22,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Change the bedsheets',
  description: 'You can also let it cool down and BAM!, it is an iced tea. A nice tea.',
  minDuration: '30',
  categories: ['Housework'],
  timeWindowStart: 8,
  timeWindowEnd: 21,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Organise your wardrobe',
  description: 'Donate what you haven’t worn for more than 2 years to charity.',
  minDuration: '60',
  categories: ['Hoursework'],
  timeWindowStart: 8,
  timeWindowEnd: 22,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Update your CV',
  description: 'You will be happy when your CV, up-to-date, is ready for you next job hunt!',
  minDuration: '30',
  categories: ['Relaxing'],
  timeWindowStart: 0,
  timeWindowEnd: 23,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Write a diary story',
  description: '10 years ago, you remembered what had happened 5 years before. But today, do you remember what happened 15 year ago? Memories are precious. Keep a trace. How was your day? How are you feeling? Just write it down.',
  minDuration: '15',
  categories: ['Relaxing'],
  timeWindowStart: 0,
  timeWindowEnd: 24,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Write a letter to your future self',
  description: "Isn't it funny how we sort of feel",
  minDuration: '60',
  categories: ['Hoursework'],
  timeWindowStart: 8,
  timeWindowEnd: 22,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Organise your wardrobe',
  description: 'Donate what you haven’t worn for more than 2 years to charity.',
  minDuration: '60',
  categories: ['Hoursework'],
  timeWindowStart: 8,
  timeWindowEnd: 22,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
{
  name: 'Organise your wardrobe',
  description: 'Donate what you haven’t worn for more than 2 years to charity.',
  minDuration: '60',
  categories: ['Hoursework'],
  timeWindowStart: 8,
  timeWindowEnd: 22,
  hasCost: false,
  isHighPriority: false,
  seasonStart: 0,
  seasonEnd: 11,
},
];
Activity.create(activitiesSeeds)
  .then((activitiesfromDB) => {
    console.log(`Created ${activitiesfromDB.length} activities`);
  })
  .catch((err) => console.log(`An error occurred while creating movies from the DB: ${err}`));