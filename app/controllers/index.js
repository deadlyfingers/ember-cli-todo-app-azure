import Ember from 'ember';

var service, table;

export default Ember.Controller.extend({
  init: function(){
    this._super();
    service = this.get('azureService');
    table = 'TodoItem';
  },

  // disable submit button if no text is entered
  isDisabled: function(){
		var text = this.get("text");
		if ( text && text !== "" ) {
			return false;
		} else {
			return true;
		}
	}.property('text'),

  // handle user's actions
	actions: {
		add: function(){
			var text = this.get("text");
			var item = {
				text: text,
				completed: false
			};
			return service.insert(table, item, this.model);
		},

		delete: function(item){
			return service.del(table, item, this.model);
		},

		toggleComplete: function(object){
			if ( ! Ember.get(object, 'completed') ) {
				Ember.set(object, 'completed', true);
			} else {
				Ember.set(object, 'completed', false);
			}
			return service.update(table, object);
		}
  }

});
