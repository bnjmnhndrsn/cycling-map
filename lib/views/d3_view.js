Backbone.D3View = Backbone.View.extend({
	setElement: function(element, delegate){
		Backbone.View.prototype.setElement.call(this, element, delegate);
		this.d3 = d3.select(this.el);
	},
	addSubview: function(selector, view, tagname){
		var elem = (typeof selector === "string" || selector instanceof Node) ? this.d3.select(selector) : selector,
			g = elem.append(tagname ? tagname : "g");
		
		this.subviews().push(view);
		view.setElement(g.node());
		view.render();
	},
	subviews: function(){
		return this._subviews || (this._subviews = []);
	},
	removeSubview: function(view){
		var i = (typeof view === "number") ? view : this.subviews().indexOf(view),
			view = (typeof view === "number") ? this.subviews()[i] : view;
			
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