App.Views.ToolTip = Backbone.View.extend({
	tagName: "g",
	initialize: function(options){
		this.x = options.x + 5;
		this.y = options.y - 5;
	},
	render: function(){
		d3.select(this.el)
			.append("text")
			.text(this.model.get("year") + ": " + this.model.get("number"))
			.attr("x", this.x)
			.attr("y", this.y);
			
		d3.select(this.el)
			.append("rect")
		return this;
	}
});
