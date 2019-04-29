const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Item Model
const Offer = require('../../models/Offer');

// @route   GET api/offers
// @desc    Get All offers
// @access  Public
router.get('/', (req, res) => {
  Offer.find()
    .sort({ date: -1 })
    .then(offers => res.json(offers));
});

// @route   POST api/offer
// @desc    Create An Offer
// @access  Private
router.post('/', (req, res) => {
// Check validation
   const newOffer = new Offer({
       title: req.body.title,
       summary: req.body.summary,
       date: req.body.date,
       duration: req.body.duration,
       place: req.body.place,
       warning: req.body.warning,
       contactName: req.body.contactName,
       contactMail: req.body.contactMail,
       draft: req.body.draft,
     });

     newOffer.save().then(offer => res.json(offer));

});

// @route   DELETE api/offers/:id
// @desc    Delete A Item
// @access  Public
router.delete('/:id', (req, res) => {
  Offer.findById(req.params.id)
    .then(offer => offer.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});
module.exports = router;