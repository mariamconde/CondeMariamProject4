const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    connection: { type: Schema.Types.ObjectId, ref: 'Connection' },
    rsvp: { type: String, enum: ['Yes', 'No', 'Maybe'] }
});

module.exports = mongoose.model('Rsvp', rsvpSchema);