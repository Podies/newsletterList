'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema

var categorySchema = Schema({
  name: String,
  className: String,
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }]
});


var Category = module.exports = mongoose.model('Category', categorySchema);