const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

// load idea model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// idea index page
router.get('/', ensureAuthenticated, (req, res) => {
  Idea.find({})
    .sort({
      date: 'desc'
    })
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas
      });
    });
});
// add idea form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('ideas/add');
});
// edit idea form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
      _id: req.params.id
    })
    .then(idea => {
      res.render('ideas/edit', {
        idea: idea
      });
    });

});
// process form
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push({
      text: 'Please add a title'
    });
  }
  if (!req.body.details) {
    errors.push({
      text: 'Please add some details'
    });
  }
  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
      user: req.user.id
    }
    new Idea(newUser)
      .save()
      .then(idea => {
        req.flash('success_msg', 'Video Idea Added');
        res.redirect('/ideas');
      })
  }
});

// edit form process
router.put('/:id', ensureAuthenticated, (req, res)=> {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save()
      .then(idea => {
        req.flash('success_msg', 'Video Idea Updated');
        res.redirect('/ideas');
      })
    
  });
});
// delete idea
router.delete('/:id', ensureAuthenticated, (req, res)=> {
  Idea.remove({_id: req.params.id})
  .then(()=> {
    req.flash('success_msg', 'Video Idea Removed')
    res.redirect('/ideas');
  });
});

module.exports = router;