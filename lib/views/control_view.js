App.Views.ControlView = Backbone.View.extend({
	tagName: "form",
	initialize: function(){		
		this.options = [];
	},
	addOption: function(model){
		var view = new App.Views.OptionView({className: "control-option", model: model });
		this.options.push(view);
		this.$el.append( view.render().$el );
	},
	render: function(){
		
		this.collection.each(function(model){
			this.addOption(model);
		}, this);
		
		return this;
	}
});