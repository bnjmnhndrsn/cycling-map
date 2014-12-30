App.Router = Backbone.Router.extend({
	routes: {
		"" : "home"
	},
	home: function(){
		var view = new App.Views.MainView()
		$("body").html(view.render().$el);
	}
});