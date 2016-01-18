export default function convert(driveModel) {
  const tableOfContents = driveModel.value.sections.value.map(section => {
    const title = (/^#+ .+$/m).exec(section.value.content.value) || ['unnamed'];
    return {
      id: section.id,
      title: title[0].replace(/^#+ /, ''),
      order: section.value.order.json
    };
  }).sort((a, b) => a.order - b.order);

  const contents = driveModel.value.sections.value.map(section => {
    return {
      id: section.value.content.id,
      content: section.value.content.value,
      order: section.value.order.json
    };
  }).sort((a, b) => a.order - b.order);

  return {
    tableOfContents,
    contents
  };
}
