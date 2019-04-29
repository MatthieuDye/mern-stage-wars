const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OfferSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  summary: {
      type: String,
      required: true
    },

  date: {
        type: String,
        required: false
      },

  duration: {
      type: String,
      required: true
    },

  place: {
      type: String,
      required: true
    },

  warning: {
      type: String,
      required: false
    },

  contactName: {
      type: String,
      required: true
    },

  contactMail: {
      type: String,
      required: true
    },

  draft: {
      type: String,
      required: false
    },

  creationDate: {
    type: Date,
    default: Date.now
  }
});
module.exports = Offer = mongoose.model('offers', OfferSchema);