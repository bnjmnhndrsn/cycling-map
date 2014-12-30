var App = {
	Views: {},
	keys: [
		'Brooklyn Bridge',
		'Hudson River Greenway at 50th St.',
		'Manhattan Bridge',
		'Queensboro Bridge',
		'Staten Island Ferry',
		'Williamsburg Bridge',
		'9th, 10th, 11th, 12th Avenues at 50th St.'
	],
	
	//cast data to Backbone model with the arrays as attributes
	parseData: function(data){
		//create object with empty collections at keys
		var obj = {},
			collection = new Backbone.Collection();
		
		_.each(App.keys, function(key){
			obj[key] = new Backbone.Model({ name: key, data: new Backbone.Collection() });
		});
		
		//add objects to arrays with form {number: num, year: year}
		_.each(data, function(d) {
			_.each(App.keys, function(key){
				if (d[key] && $.isNumeric(d[key].replace(",", "")) ){
					var datum = new Backbone.Model();
					datum.set('year', d['Year']);
					datum.set('number', d[key].replace(",", ""));
					obj[key].get("data").add(datum);
				}	
			});
		});
		
		//add each of the model series to empty collection
		_.each(obj, function(model){
			collection.add(model);
		});
		
		return collection;
	},
	initialize: function(){
		d3.csv("data/cyclist_counts.csv", function(error, data) {
			var collection = App.parseData(data),
				view = new App.Views.MainView({ collection: collection });
			
			$("body").append(view.render().$el);
		});
	}
};


