App.Views.OptionView = Backbone.View.extend({
	events: {
		"click input[type='checkbox']": "toggle"
	},
	template: _.template(
		"<label><%= series.get('name') %><input type='checkbox'></label>"
	),
	render: function(){
		var rendered = this.template({ series: this.model });
		this.$el.html(rendered);
		return this;
	},
	toggle: function(event){
		var type = ($(event.currentTarget).prop("checked"));
		this.model.trigger(type ? "show" : "hide", this.model);
	}
});