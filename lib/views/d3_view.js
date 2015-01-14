Backbone.D3View = Backbone.View.extend({
	nameSpace: function(){
		var nameSpace;
		
		if (this._SvgTags.indexOf(this.tagName) > -1) {
			nameSpace = "http://www.w3.org/2000/svg";
		} else {
			nameSpace = "http://www.w3.org/1999/xhtml";
		}
		console.log(this.tagName, nameSpace);
		return nameSpace;
	},
	setElement: function(element, delegate){
		Backbone.View.prototype.setElement.call(this, element, delegate);
		this.d3 = d3.select(this.el);
	},
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = $(window.document.createElementNS(_.result(this, 'nameSpace'), _.result(this, 'tagName'))).attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    },
	addSubview: function(selector, view){
		var elem = (typeof selector === "string" || selector instanceof Node) ? this.d3.select(selector) : selector;
		elem.append(function(){
			return view.el;
		});
		this.subviews().push(view);
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
	},
	//list of tags only in the SVG namespace, source: https://developer.mozilla.org/en-US/docs/Web/SVG/Element
	_SvgTags: ["altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "svg", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"]
});