App.Views.MainView = Backbone.D3View.extend({
	template: _.template("<div id='chart'></div><div id='controls'></div>"),
	initialize: function(){
		this.chartView = new App.Views.ChartView({ collection: this.collection });
		this.controlView = new App.Views.ControlView({ collection: this.collection });
	},
	render: function(){
		this.$el.html(this.template());
		this.addSubview("#chart", this.chartView, "div");
		this.addSubview("#controls", this.controlView, "div");
		return this;
	}
});