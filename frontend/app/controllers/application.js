import Ember from 'ember';

export default Ember.Controller.extend({
  annotation: {
    documentation: 'hola mundo perdido???'
  },

  compiledDocumentation: function() {
    return this.get('annotation.documentation').htmlSafe();
  }.property('annotation.documentation')
});
