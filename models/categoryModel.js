'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var categorySchema = Schema({
  name: String,
  className: String,
});


var Category = module.exports = mongoose.model('Category', categorySchema);