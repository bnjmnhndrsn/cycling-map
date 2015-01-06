App.Views.ToolTip = Backbone.View.extend({
	tagName:  "g",
	initialize: function(options){
		this.color = options.color;
		this.name = options.name;
		this.padding = 5;
		this.margin = 5;
		this.box = options.box;
		this.textAnchor = (this.box.x + this.box.width / 2) < 480 ? "start" : "end";
		
	},
	render: function(){
		this.addText();
		this.addRect();
		return this;
	},
	
	addText: function(){
		var x = this.box.x + this.box.width / 2 + 
			(this.textAnchor === "start" ? this.padding : -this.padding);
	
		this.text = d3.select(this.el)
			.append("text")
			.attr("x", x)
			.attr("y", this.box.y - this.margin - 40)
			.attr("text-anchor", this.textAnchor);
			
		this.text.append("tspan")
			.attr("x", x)
			.attr("dy", 20)
			.text(this.name)
			.style("text-decoration", "underline");
			
		this.text.append("tspan")
			.attr("x", x)
			.attr("dy", 20)
			.text(this.model.get("year") + ": " + this.model.get("number") + " weekly cyclists")
			.style("font-size", "14px");
	},
	addRect: function(){
		var textBBox = this.text.node().getBBox();

		var rect = d3.select(this.el)
			.insert("rect", ":first-child")
		    .attr("x", textBBox.x - this.padding)
		    .attr("y", textBBox.y - this.padding)
		    .attr("width", textBBox.width + (this.padding * 2))
		    .attr("height", textBBox.height + (this.padding * 2))
			.style("stroke", this.color)
			.style("stroke-opacity","1")
			.style("stroke-width", 2)
			.style("fill", "white")
		    .style("fill-opacity", "1");
	}
});
