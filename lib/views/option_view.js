App.Views.OptionView = Backbone.View.extend({
	events: {
		"click button": "toggle",
		"mouseenter": "mouseenter",
		"mouseleave": "mouseleave"
	},
	template: _.template(
		"<button><%= series.get('name') %></button>"
	),
	render: function(){
		var rendered = this.template({ series: this.model });
		this.$el.addClass("control-option")
		this.$el.html(rendered);
		return this;
	},
	toggle: function(event){
		event.preventDefault();
		
		var elem = event.currentTarget,
			type = !($(elem).hasClass("active"));
			
		d3.select(elem).style("background-color", type ? this.model.get('color') : 'white' );
		
		$(elem).toggleClass("active");
		
		this.model.trigger(type ? "show" : "hide", this.model);
	}
});