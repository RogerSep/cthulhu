function TextSection() {}

export default TextSection;
export const init = () => {
  TextSection.prototype.order = window.gapi.drive.realtime.custom.collaborativeField('order');
  TextSection.prototype.content = window.gapi.drive.realtime.custom.collaborativeField('content');

  TextSection.prototype.containsCollaborativeString = function(stringId) {
    return this.content.getId() === stringId;
  };
};

export function initializer() {
  const model = window.gapi.drive.realtime.custom.getModel(this);

  this.content = model.createString();

  this.order = model.getRoot().get('sections').length;
}
