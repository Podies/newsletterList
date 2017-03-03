'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema

var submitNewsletterSchema = Schema({
  name: String,
  description: String,
  website: String,
  category: String,
  subcategory: String,
});

var SubmitNewsletter = module.exports = mongoose.model('SubmitNewsletter', submitNewsletterSchema);