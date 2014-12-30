App.Views.MainView = Backbone.View.extend({
	template: _.template("<div id='chart'></div><div id='controls'></div>"),
	initialize: function(){
		this.chartView = new App.Views.ChartView({ collection: this.collection });
		this.controlView = new App.Views.ControlView({ collection: this.collection });
	},
	render: function(){
		this.$el.html(this.template());
		this.$el.find("#chart").html( this.chartView.render().$el );
		this.$el.find("#controls").html( this.controlView.render().$el );
		return this;
	}
});