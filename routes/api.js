var express = require('express');
var router = express.Router();
var Category = require('../models/categoryModel');
var Newsletter = require('../models/newsletterModel');
var Subcategory = require('../models/subCategory')

/* GET home page. */
router.get('/', function(req, res) {
  res.send("Send api here");
});

router.get('/newsletter', function(req, res) {
  Newsletter.find({}).populate('category', 'name').populate('subcategory','name').exec(function(err, newsletters) {
    if(err) {
      console.log(err);
    }
    res.json({newsletters: newsletters});
  })
});

router.get('/categories/:category/newsletters', function(req, res) {
  Category.findOne({name: req.params.category}).exec(function(err, category){
    Newsletter.find({ category: category._id }).populate('category', 'name').populate('subcategory','name').exec(function(err, newsletters) {
      if(err) {
        console.log(err);
      }
      res.json({newsletters: newsletters});
    })
  });
});

router.get('/subcategories/:subcategory/newsletters', function(req, res) {
  Subcategory.findOne({name: req.params.subcategory}).exec(function(err, subCategory){
    Newsletter.find({subcategory: subCategory._id}).populate('category', 'name').populate('subcategory','name').exec(function(err, newsletters) {
      if(err) {
        console.log(err);
      }
      res.json({newsletters: newsletters});
    })
  });
});

router.get('/categories', function(req, res) {
  Category.find({}).populate('subcategories', 'name').exec(function(err, categories) {
    if(err) {
      console.log(err);
    }

    res.json({ categories: categories });
  });
});

router.get('/subcategories', function(req, res) {
  Subcategory.find({}).populate('category', 'name').exec(function(err, subcategories) {
    if(err) {
      console.log(err);
    }

    res.json({ subcategories: subcategories });
  });
});

module.exports = router;