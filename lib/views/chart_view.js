App.Views.ChartView = Backbone.View.extend({
	initialize: function(options){
		this.data = options.data;
		this.margin = {top: 20, right: 20, bottom: 30, left: 50};
		this.lines = [];
		this.listenTo(this.collection, "show", this.attachLine);
		this.listenTo(this.collection, "hide", this.removeLine);
	},
	render: function(){
		this.setDimensions();
		this.setScales();
		this.createSvg();
		this.attachAxes();
		return this;
	},
	attachAxes: function(){
		var g = this.svg.append("g"),
			options = { el: g.node(), x: this.x, y: this.y, height: this.height }
			view = new App.Views.AxesView(options);

		this.g.append( function(){
			return view.render().el;
		});
	},
	attachLine: function(model){
		var g = this.svg.append("g"),
			options = {el: g.node(), x: this.x, y: this.y, model: model }
			view = new App.Views.LineView(options);
		this.lines.push(view);
		this.g.append( function(){
			return view.render().el;
		});

	},
	removeLine: function(model){
		var i = 0;
		while (i < this.lines.length) {
			if (this.lines[i].model.id === model.id) {
				this.lines[i].remove();
				this.lines.splice(i, 1);
				break;
			}
		}
	},
	createSvg: function(){
		this.svg = d3.select( this.el ).append("svg");
		this.svg.attr("width", this.width + this.margin.left + this.margin.right)
		.attr("height", this.height + this.margin.top + this.margin.bottom);
		this.g = this.svg.append("g")
	   	 	.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
	},
	setDimensions: function(){
		this.width = 960 - this.margin.left - this.margin.right,
		this.height = 500 - this.margin.top - this.margin.bottom;
	},
	setScales: function(){
		this.x = d3.scale.linear().range([0, this.width]).domain([1985, 2011]);
		this.y = d3.scale.linear().range([this.height, 0]).domain([0, 6000]);
	}
});