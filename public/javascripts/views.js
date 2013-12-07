App.Views.App = Backbone.View.extend({
  initialize: function() {
    vent.on('contact:edit', this.editContact);
    var newContact = new App.Views.NewContact;
    var allContacts = new App.Views.Contacts({collection: App.contacts});
    $('#allContacts').append(allContacts.el);
  },
  editContact: function(contact) {
    var editContactView = new App.Views.editContact({model: contact});
    $('#editContact').html(editContactView.el);
  }
});

/*
 * New Contact
 */
 App.Views.NewContact = Backbone.View.extend({
  el: "#new-contact",
  events: {
    'click': 'NewContact'
  },

  NewContact: function() {
    var addContact = new App.Views.AddContact({collection: App.contacts});
    addContact.show();
  }
 });


/*
 * Add Contact View
 */

App.Views.AddContact = Backbone.View.extend({
  el: "#addContact",

  initialize: function() {
    this.first_name = $('#first_name');
    this.last_name = $('#last_name');
    this.email_address = $('#email_address');
    this.description = $('#description');
  },

  events: {
    'submit .addContact': 'addContact',
  },

  addContact: function(e) {
    e.preventDefault();
    this.collection.create({
      first_name: this.first_name.val(),
      last_name: this.last_name.val(),
      email_address: this.email_address.val(),
      description: this.description.val()
    }, {wait: true});
    this.clearForm();
    this.$el.addClass('hidden');
  },

  show: function() {
    this.$el.removeClass('hidden');
  },

  clearForm: function() {
    this.first_name.val('');
    this.last_name.val('');
    this.email_address.val('');
    this.description.val('');
  }
});

/*
 * Edit Contact
 */
 App.Views.editContact = Backbone.View.extend({
  template: template('editContactTemplate'),

  initialize: function() {
    this.render();
  },

  events: {
    'submit': 'submit',
    'click .cancel': 'cancel'
  },

  submit: function(e) {
    e.preventDefault();
    this.model.save({
      first_name: this.$('form').find('#edit_first_name').val(),
      last_name: this.$('form').find('#edit_last_name').val(),
      email_address: this.$('form').find('#edit_email_address').val(),
      description: this.$('form').find('#edit_description').val(),
    });
    this.$el.remove();
  },

  cancel: function() {
    this.$el.remove();
  },

  render: function() {
    this.$el.append(this.template(this.model.toJSON()));
  }

 });

/*
 * All Contact Views
 */

 App.Views.Contacts = Backbone.View.extend({
  tagName: 'tbody',

  initialize: function() {
    this.collection.on('sync', this.addOne, this);
    this.render();
  },

  render: function() {
    this.collection.each(this.addOne, this);
    return this;
  },

  addOne: function(contact) {
    var contactView = new App.Views.Contact({model: contact});
    this.$el.append(contactView.render().el);
  }
 })

 /*
  * Single Contact View
  */
  
  App.Views.Contact = Backbone.View.extend({
    tagName: 'tr',

    template: template('allContactsTemplate'),

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.unrender, this);
    },

    events: {
      'click .delete': 'deleteContact',
      'click .edit': 'editContact'
    },

    editContact: function(e) {
      e.preventDefault();
      vent.trigger('contact:edit', this.model);
    },

    deleteContact: function(e) {
      e.preventDefault();
      var next = confirm("Are you sure you want to delete contact?");
      next ? this.model.destroy({wait: true}) : undefined;
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    unrender: function() {
      this.$el.remove();
    }
  })
