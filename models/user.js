var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = Schema({
  email: String,
  subcategorySubscribed: [{type: Schema.Types.ObjectId, ref: 'Subcategory'}]
});

var User = module.exports = mongoose.model('User', userSchema);