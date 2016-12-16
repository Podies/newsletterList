var express = require('express');
var router = express.Router();
var Category = require('../models/categoryModel');
var Newsletter = require('../models/newsletterModel');
var Subcategory = require('../models/subCategory');
var HandPicked = require('../models/handPicked');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {
  var api = {
    "api/newsletter": "Newslettes List",
    "api/categories": "Categories List",
    "api/subcategories": "Subcategory List",
    "api/handpicked": "Selected Newsletter"
  };
  res.json({ api});
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
    if(!category) {
      return res.status(404).send({ message: 'Not Found.' });
    }

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
    if(!subCategory) {
      return res.status(404).send({ message: 'Not Found.' });
    }
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

router.get('/handpicked', function(req, res) {
  HandPicked.find({}).lean().populate('newsletter').exec(function(err, handpicked) {
    Newsletter.populate(handpicked, [{path: 'newsletter.subcategory', model: 'Subcategory', select: 'name'}, {path: 'newsletter.category', model: 'Category', select: 'name'},],
      function(err, newsletter){
        if(err) {
          console.log(err);
        }
        var newsletters = handpicked.map((item, i) => {
          return item.newsletter;
        });
        res.json({handpicked: newsletters});
    })
  });

});

router.post('./user/subscribe', function(req, res) {
  User.findOne({email: req.body.email}).exec(function(err, user){
    if(!req.body.email) {
      return res.status(400).send({message: 'Email is must.'})
    }

    if(user) {
      var subscriptions = user.subcategorySubscribed;
      var newSubscriptions = req.body.subcategories;

      newSubscriptions.forEach(function(sub, i) {
        if(subscriptions.indexOf(sub) == -1) {
          subscriptions.push(sub);
        }
      });

      user.subcategorySubscribed = subscriptions;
      user.save();
    } else {
      // make new user with subscribed subcategories
      var newUser = new User({email: req.body.email, subcategorySubscribed: req.body.subcategory});
      newUser.save(function(err, savedUser) {
        if(err) {
          console.log(err);
        }
      })
    }

  });
});
module.exports = router;