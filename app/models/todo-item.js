import DS from 'ember-data';

export default DS.Model.extend({
  // NB: You may not set 'id' as an attribute on your model
  text: DS.attr('string'),
	completed: DS.attr('boolean')
});
