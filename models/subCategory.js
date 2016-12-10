var mongoose = require('mongoose');
var Schema = mongoose.Schema

var subCategorySchema = Schema({
  name: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

var Subcategory = module.exports = mongoose.model('Subcategory', subCategorySchema);