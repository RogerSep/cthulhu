export default function convert(driveModel) {
  const tableOfContents = driveModel.value.sections.value
    .filter(section => !section.value.parent.json)
    .map(section => {
      const title = (/^#+ .+$/m).exec(section.value.content.value) || ['unnamed'];
      return {
        id: section.id,
        title: title[0].replace(/^#+ /, ''),
        order: section.value.order.json
      };
    }).sort((a, b) => a.order - b.order);

  const contents = driveModel.value.sections.value
    .filter(section => !section.value.parent.json)
    .map(section => {
      return {
        id: section.id,
        content: section.value.content.value,
        order: section.value.order.json,
        subsections: driveModel.value.sections.value
          .filter(subsection => subsection.value.parent.json === section.id)
          .map(subsection => ({
            id: subsection.id,
            content: subsection.value.content.value,
            order: subsection.value.order.json
          }))
          .sort((a, b) => a.order - b.order)
      };
    }).sort((a, b) => a.order - b.order);

  return {
    tableOfContents,
    contents
  };
}
