App.Views.AxesView = Backbone.View.extend({
	initialize: function(options){
		this.height = options.height;
		this.x = options.x;
		this.y = options.y;
		this.xAxis = d3.svg.axis().scale(this.x).orient("bottom").tickFormat(d3.format("d"));
		this.yAxis = d3.svg.axis().scale(this.y).orient("left");
	},
	render: function(){
		var el = d3.select(this.el);

		el.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + this.height + ")")
		  .call(this.xAxis);

		el.append("g")
		  .attr("class", "y axis")
		  .call(this.yAxis)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("Weekly Riders");
		
		return this;
	}
});