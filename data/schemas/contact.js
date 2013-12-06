var mongoose = require('mongoose');

var Schema = require('mongoose').Schema;

var ContactSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    required: true
  },
  description: {
    type: String
  },

});

module.exports = ContactSchema;