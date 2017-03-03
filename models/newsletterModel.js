'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema

var newsletterSchema = Schema({
  name: String,
  description: String,
  website: String,
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
  subcategory: {type: Schema.Types.ObjectId, ref: 'Subcategory'},
});

var Newsletter = module.exports = mongoose.model('Newsletter', newsletterSchema);