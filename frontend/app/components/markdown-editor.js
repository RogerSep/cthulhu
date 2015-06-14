import Ember from 'ember';

export default Ember.Component.extend({
  sourceText: '',

  actions: {
    compile() {
      this.set('text', marked(this.sourceText));
    }
  }
});
