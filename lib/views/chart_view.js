App.Views.ChartView = Backbone.D3View.extend({
	initialize: function(options){
		this.data = options.data;
		this.margin = {top: 20, right: 20, bottom: 30, left: 50};
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
		var options = {x: this.x, y: this.y, height: this.height },
			view = new App.Views.AxesView(options);

		this.addSubview(this.g, view);
	},
	attachLine: function(model){	
		var options = {x: this.x, y: this.y, model: model},
			view = new App.Views.LineView(options);
	
		this.addSubview(this.g, view);	
	},
	removeLine: function(model){
		var i = 0,
			subviews = this.subviews(),
			length = subviews.length;
			
		for (i; i < length; i++) {
			if (this.subviews()[i].model && this.subviews()[i].model.cid === model.cid) {
				this.removeSubview(i);
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