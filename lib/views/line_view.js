App.Views.LineView = Backbone.View.extend({
	initialize: function(options){
		var x = this.x = options.x;
		var y = this.y = options.y;
		
		this.line = d3.svg.line()
			.x(function(d) { return x(d.get('year')); })
			.y(function(d) { return y(d.get('number')); });

	},
	render: function(){
		debugger;
  		d3.select(this.el)
		.append("path")
		.datum(this.model.get('data').models)
  	  	.attr("class", "line")
		.attr("d", this.line)
		.on("click", function(d){
				console.log(d);
		});
		
		return this;
	}
});