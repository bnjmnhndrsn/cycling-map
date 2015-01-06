App.Views.ControlView = Backbone.D3View.extend({
	tagName: "form",
	addOption: function(model){
		var view = new App.Views.OptionView({model: model });
		this.addSubview(this.d3, view, "div");
	},
	render: function(){
		this.collection.each(function(model){
			this.addOption(model);
		}, this);
		
		return this;
	}
});