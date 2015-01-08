(function (root, $, Backbone) {

  root.App = root.App || {};

  App.HeaderView = Backbone.View.extend({
    el: '#header',
    events: {
      'click [data-hook=nav-index]': 'navigate',
      'click [data-hook=nav-users]': 'navigate'
    },
    navigate: function(e){
      e.preventDefault();
      var url = $(e.currentTarget).attr('href');
      App.router.navigate(url, { trigger: true });
    }
  });

  App.headerView = new App.HeaderView;

  App.UserItem = Backbone.Model.extend({});

  App.UserItems = Backbone.Collection.extend({
    model: App.UserItem
  });

  App.UserView = Backbone.View.extend({
    events: {
      'click [data-hook=btn-delete]': 'deleteUser',
      'click [data-hook=btn-details]': 'navigate'
    },
    deleteUser: function (e) {
      var confirmed = confirm('Delete ' + this.model.get('Name') + ' living in ' + this.model.get('Suburb') + '?');
      if (confirmed) this.$el.remove();
    },
    navigate: function (e) {
      e.preventDefault();
      var url = $(e.currentTarget).attr('href');
      App.router.navigate(url, { trigger: true });
    }
  });

  App.UsersView = Backbone.View.extend({
    el: '.user-list',
    initialize: function () {
      if (this.collection) {
        this.collection.each(function (item) {
          new App.UserView({ model: item, el: '[data-id=' + item.get('Id') + ']' });
        });
      }
    }
  });

  
  App.Router = Backbone.Router.extend({
    routes: {
      '(/)': 'index',
      'users(/)': 'users',
      'users/:id' : 'detail'
    },
    index: function () {
      $.getJSON('/').done(function (result) {
        $('.body-content').html(result.view);
      });
    },
    users: function () {
      $.getJSON('/users').done(function (result) {
        $('.body-content').html(result.view);
        new App.UsersView({ collection: new App.UserItems(result.model) });
      });
    },
    detail: function (id) {
      $.getJSON('/users/'+id).done(function (result) {
        $('.body-content').html(result.view);
      });
    }
  });

  App.router = new App.Router;

  Backbone.history.start({ pushState: true, silent: true });

})(this, jQuery, Backbone);