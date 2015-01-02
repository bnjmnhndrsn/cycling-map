App.Views.LineView = Backbone.View.extend({
	initialize: function(options){
		var x = this.x = options.x;
		var y = this.y = options.y;
		
		this.line = d3.svg.line()
			.x(function(d) { return x(d.get('year')); })
			.y(function(d) { return y(d.get('number')); });
			
	},
	render: function(){
		var data = this.model.get('data').models,
			duration = data.length * 125;
		
		this.addLine(data, duration);
		this.addDots(data, duration);
	
		return this;
	},
	addLine: function(data, duration, callback){
  		d3.select(this.el)
		.append("path")
		.datum(data)
  	  	.attr("class", "line")
		.attr("d", this.line)
		.attr("stroke", this.model.get('color'))
		.transition()
		.ease("linear")
		.duration(duration)
		.attrTween('d', this.getLineInterpolation(data));
	},
	addDots: function(data, delay){
		var that = this,
			end = 1,
			timer = setInterval(function(){
				var subArray = data.slice(0, end + 1);

				d3.select(that.el)
				.selectAll('circle')
				.data(subArray)
				.enter()
				.append('circle')
				.attr("r", 0)
				.attr("cx", function(d){
					return that.x(d.get('year'));
				})
				.attr("cy", function(d){
					return that.y(d.get('number'));
				})
				.transition()
				.duration(250)
				.attr("r", 5);
				
				if (end++ === data.length) {
					clearInterval(timer);
				}
				
			}, 125);

		
		
	},
	// adapted from http://big-elephants.com/2014-06/unrolling-line-charts-d3js/
	getLineInterpolation: function(data) {
		var that = this,
			min = +data[0].get("year");
		
		return function (d, i, a) {
			var interpolate = d3.scale.linear()
			  .domain([0, 1])
			  .range([1, data.length]);

			return function(t) {
				var flooredX = Math.floor(interpolate(t));
				var weight = interpolate(t) - flooredX;
				var interpolatedLine = data.slice(0, flooredX);
				if (flooredX > 0 && flooredX < data.length) {
					var weightedLineAverage = data[flooredX].get('number') * weight + data[flooredX-1].get('number') * (1 - weight);
					var year = min + interpolate(t) - 1;
					
					interpolatedLine.push(
						new Backbone.Model({year: year, number: weightedLineAverage })
					);
			
				}
			


				return that.line(interpolatedLine);
			}
		}
	}
});