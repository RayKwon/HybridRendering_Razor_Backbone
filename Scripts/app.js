(function (root, $, Backbone) {

  root.App = root.App || {};

  App.HeaderView = Backbone.View.extend({
    el: '#header',
    events: {
      'click [data-hook=nav-index]': 'moveToIndexPage',
      'click [data-hook=nav-users]': 'moveToUsersPage'
    },
    moveToIndexPage: function (e) {
      e.preventDefault();
      App.router.navigate('/', { trigger: true });
    },
    moveToUsersPage: function (e) {
      e.preventDefault();
      App.router.navigate('users', { trigger: true });
    }
  });

  App.headerView = new App.HeaderView;

  App.UserItem = Backbone.Model.extend({});

  App.UserItems = Backbone.Collection.extend({
    model: App.UserItem
  });

  App.UserView = Backbone.View.extend({
    events: {
      'click [data-hook=btn-delete]': 'deleteUser'
    },
    deleteUser: function (e) {
      var confirmed = confirm('Delete ' + this.model.get('Name') + ' living in ' + this.model.get('Suburb') + '?');
      if (confirmed) this.$el.remove();
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
      'users(/)': 'users'
    },
    index: function () {
      $.getJSON('/').done(function (result) {
        $('.body-content').html(result.view);
      });
    },
    users: function () {
      $.getJSON('users').done(function (result) {
        $('.body-content').html(result.view);
        new App.UsersView({ collection: new App.UserItems(result.model) });
      });
    }
  });

  App.router = new App.Router;

  Backbone.history.start({ pushState: true, silent: true });

})(this, jQuery, Backbone);