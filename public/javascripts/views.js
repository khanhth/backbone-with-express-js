App.Views.App = Backbone.View.extend({
  initialize: function() {
    var addContact = new App.Views.AddContact;
  }
});

/*
 * Add Contact View
 */

App.Views.AddContact = Backbone.View.extend({
  el: "#addContact",

  events: {
    'submit': 'addContact'
  },

  addContact: function() {
    console.log("add contact")
  }
});