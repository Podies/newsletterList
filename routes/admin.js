var express = require('express');
var router = express.Router();
var Newsletter = require('../models/newsletterModel');
var Category = require('../models/categoryModel');
var Subcategory = require('../models/subCategory');
var HandPicked = require('../models/handPicked');
var config = require('../config');

function verifyPassword(req, res, next) {
  var password = req.body.password;

  if(password !== config.password) {
    return res.status(400).send({ message: 'Not Proper Data Sent.' });
  }

  next();
}


/* GET users listing. */
router.get('/', function(req, res) {
  Newsletter.find({}).populate('category subcategory').exec(function(err, newsletters) {
    if(err) {
      console.log(err);
    }
    var model = {
      newsletters: newsletters
    }
    res.render('dashboard', model);
  })
});

router.get('/add', function(req, res) {
  Category.find({}, function(err, categories) {
    if(err) {
      console.log(err);
    }
    Subcategory.find({}, function(err, subcategories) {
      if(err) {
        console.log(err);
      }
      var model = {
        categories: categories,
        subcategories: subcategories
      }
      res.render('addnewsletter', model);
    });
  });
});

router.post('/add', function(req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var category = req.body.category;
  var subcategory = req.body.subcategory;
  var website = req.body.website;

  if(!name || !category || !subcategory || !website) {
    return res.status(400).send({message: "All fields are must!!!"});
  }
  var newNewsletter = new Newsletter({
    name: name,
    description: description,
    category: category,
    subcategory: subcategory,
    website: website
  });
  newNewsletter.save(function(err, savedNewsletter) {
    console.log(err, savedNewsletter);
    res.redirect('/admin');
  })
});

  // Delete Newsletter
router.delete('/delete/:id', function(req,res) {
    Newsletter.remove({_id: req.params.id}, function(err) {
    		HandPicked.remove({ newsletter: req.params.id }, function (err, con) {
    			// console.log(err, 'check for error', con);
    		});
        if(err) {
            console.log(err);
        }
        res.redirect('/admin');
    });
});

router.get('/subcategories', function(req, res) {
  Subcategory.find({}).populate('category', 'name').exec(function(err, subcategories) {
    if(err) {
      console.log(err);
    }
    var model = {
      subcategories: subcategories
    }
    res.render('subcategories', model);
  });
});

router.get('/subcategories/add', function(req, res) {
  Category.find({}, function(err, categories) {
    if(err) {
      console.log(err);
    }
    var model = {
      categories: categories
    }
    res.render('addsubcategory', model);
  });
});

router.post('/subcategories/add', function(req, res) {
  var name = req.body.name || "" ;
  var category = req.body.category || "" ;

  if(!name || !category) {
    return res.status(400).send({ message: 'Not Proper Data Sent.' });
  }

  var newSubcategory = new Subcategory({ name: name, category: category });

  newSubcategory.save(function(err, savedSubcategory){

    res.redirect('/admin/subcategories');

    Category.findOneAndUpdate(
      {_id: savedSubcategory.category},
      {$push: {subcategories: savedSubcategory._id}}
    ).exec();
  })
});


router.get('/categories', function(req, res) {
  Category.find({}, function(err, categories) {
    if(err) {
      console.log(err);
    }
    var model = {
      categories: categories
    }
    res.render('categories', model);
  });
});

router.get('/categories/add', function(req, res) {
  res.render('addcategory');
});

router.post('/categories/add', function(req, res) {
  var name = req.body.name;
  var className = req.body.class;

  if(!name || !className) {
    return res.status(400).send({ message: 'Not Proper Data Sent.' });
  }

  var newCategory = new Category({ name: name, className: className });

  newCategory.save(function(err, savedCategory) {
    res.redirect('/admin/categories');
  });
})

router.get('/handpicked', function(req, res) {
  HandPicked.find({}).lean().populate('newsletter').exec(function(err, handpicked) {
    Newsletter.populate(handpicked, [{path: 'newsletter.subcategory', model: 'Subcategory', select: 'name'}, {path: 'newsletter.category', model: 'Category', select: 'name'},],
      function(err, newsletter){
        if(err) {
          console.log(err);
        }
        var model = {
          handpicked: handpicked
        }
        console.log(handpicked);
        res.render('handPicked', model);
    })
  });
});

// Add Hnadpicked Newsletter
router.get('/handpicked/add', function(req, res) {
  Newsletter.find({}, function(err, newsletters) {
    if(err) {
      console.log(err);
    }
    var model = {
      newsletters: newsletters
    }
    res.render('addhandpicked', model);
  })
});

router.post('/handpicked/add', function(req, res) {
  var handpicked = req.body.handpicked;
  var newHandPicked = new HandPicked({newsletter: handpicked});
  newHandPicked.save(function(err, saved){
    res.redirect('/admin/handpicked')
  })
});

    // Delete Handpicked
router.delete('/handpicked/delete/:id', function(req,res) {
  HandPicked.findOneAndRemove({_id: req.params.id}, function(err, status) {
      if(err) {
          console.log(err);
      }
      res.redirect('/admin/handpicked');
  });
});

module.exports = router;
