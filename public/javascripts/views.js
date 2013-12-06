App.Views.App = Backbone.View.extend({
  initialize: function() {
    console.log(this.collection.toJSON());
  }
});