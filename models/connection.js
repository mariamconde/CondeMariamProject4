const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  title: { type: String, required: [true, 'title is required'] },
  topic: { type: String, required: [true, 'topic is required'] },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  details: {
    type: String, required: [true, 'details are required'],
    minLength: [10, 'the details should have at least 10 characters']
  },
  location: { type: String, required: [true, 'location is required'] },
  date: { type: String, required: [true, 'date is required'] },
  startTime: { type: String, required: [true, 'start time is required'] },
  endTime: { type: String, required: [true, 'end time is required'] },
  imageURL: { type: String, required: [true, 'image url is required'] }
},
  { timestamp: true });
//collection name is connections in the database
module.exports = mongoose.model('Connection', connectionSchema);


