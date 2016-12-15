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
  // OLD CODE
  // HandPicked.find({}).populate('category', 'name').populate('subcategory','name').exec(function(err, handpicked) {
  //   if(err) {
  //     console.log(err);
  //   }
  //   res.json({handpicked: handpicked});
  // })

  HandPicked.find({}).populate('newsletter').exec(function(err, handpicked) {
    Newsletter.populate(handpicked, [{path: 'category', select: 'name'},{path: 'subcategory', select: 'name'}],
      function(err, newsletter){
        if(err) {
          console.log(err);
        }
        res.json({handpicked: handpicked});
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