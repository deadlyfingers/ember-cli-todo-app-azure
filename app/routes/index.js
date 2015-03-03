import Ember from 'ember';

var service, table;

export default Ember.Route.extend({
  init: function(){
    this._super();
    service = this.get('azureService');
    table = 'TodoItem';
  },

  model: function(){
		console.log("route service:" + service);
		return service.read(table);
  }

});
