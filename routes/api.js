var express = require('express');
var router = express.Router();
var Category = require('../models/categoryModel');
var Newsletter = require('../models/newsletterModel');
var Subcategory = require('../models/subCategory');
var HandPicked = require('../models/handPicked');
var User = require('../models/user');
var SubmitNewsletter = require('../models/submitNewsletter');

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
        	if(item.newsletter !== null)
          	return item.newsletter;
        });
        res.json({handpicked: newsletters});
    })
  });

});

router.post('/user/subscribe', function(req, res) {
	function isEmailAddress(str) {
   var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   return pattern.test(str);  // returns a boolean
	}
	var emailId = req.body.email;
	User.findOne({email: emailId}).exec(function(err, user){
    if(!emailId && !isEmailAddress(emailId)) {
      return res.status(400).send({message: 'Enter Valid Email.'})
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
      newUser.save();
    }

    res.json({ message: 'Thanks for subscribing.' });

  });
});


// router.get('/search/:query',function(req, res) {
//   console.log(req.params.query);
//   Newsletter.find({$text: { $search: req.params.query}}).populate('category', 'name')
//   .populate('subcategory', 'name').exec(function(err, data) {
//     if(err) {
//       console.log(err);
//     }
//     res.json({"search": data});
//   });
// });

router.post('/submit', function(req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var website = req.body.website;
  var category = req.body.category;
  var subcategory = req.body.subcategory;

  if(!name || !website) {
    res.status(404).send({message: "Name and Website is Must !!"});
  }

  var newSubmitNewsletter = new SubmitNewsletter({name: name, description: description, website: website, category: categories, subcategory: subcategory});
  newSubmitNewsletter.save(function(err, savedNewsletter) {
    if(err) {
      console.log(err);
    }
  });
});

router.get('/search/:searchTerm', function(req, res){
	Newsletter.find({$text: { $search: req.params.searchTerm}}).populate('category', 'name').populate('subcategory', 'name').exec(function(err, data){
		if (err) {
			console.log(err);
		}
		res.json({ search: data });
		console.log(data);
	});
});

module.exports = router;
