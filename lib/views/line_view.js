App.Views.LineView = Backbone.View.extend({
	initialize: function(options){
		var x = this.x = options.x;
		var y = this.y = options.y;
		
		this.line = d3.svg.line()
			.x(function(d) { return x(d.get('year')); })
			.y(function(d) { return y(d.get('number')); });

	},
	render: function(){
		var data = this.model.get('data').models;
		
  		d3.select(this.el)
		.append("path")
		.datum(data)
  	  	.attr("class", "line")
		.attr("d", this.line)
		.transition()
		.ease("linear")
		.duration(5000)
		.attrTween('d', this.getSmoothInterpolation(data));
	
		
		return this;
	},
	// originally from http://big-elephants.com/2014-06/unrolling-line-charts-d3js/
	getSmoothInterpolation: function(data) {
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
					console.log(data[flooredX].get('year'), year);
					interpolatedLine.push(
						new Backbone.Model({year: year, number: weightedLineAverage })
					);
			
				}
			


				return that.line(interpolatedLine);
			}
		}
	}
});