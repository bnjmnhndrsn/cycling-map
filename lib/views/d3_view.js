Backbone.D3View = Backbone.View.extend({
	addSubview: function(selector, view){
		var elem = (typeof selector === "string") ? d3.select(selector) : selector,
			g = this.svg.append("g");
		
		this.subviews().push(view);
		view.setElement(g);
		view.render();
	},
	subviews: function(){
		return this._subviews || (this._subviews = []);
	},
	removeSubview: function(view){
		var i = this.subviews().indexOf(view);
		this.subviews().splice(i, 1);
		view.remove();
	},
	remove: function(){
		_.each(this.subviews(), function(subview){
			subview.remove();
		});
		
		Backbone.View.prototype.remove.apply(this);
	}
});