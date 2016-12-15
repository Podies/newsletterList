var mongoose = require('mongoose');
var Schema = mongoose.Schema

var handPickedSchema = Schema({
  newsletter: {type: Schema.Types.ObjectId, ref: 'Newsletter'}
});

var HandPicked = module.exports = mongoose.model('HandPicked', handPickedSchema);