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
        type: section.value.type.json,
        subsections: driveModel.value.sections.value
          .filter(subsection => subsection.value.parent.json === section.id)
          .map(subsection => {
            if (subsection.value.type.json === 'text') {
              return {
                id: subsection.id,
                content: subsection.value.content.value,
                order: subsection.value.order.json,
                type: 'text'
              };
            } else {
              return {
                id: subsection.id,
                type: 'annotatedImage',
                order: subsection.value.order.json,
                image: subsection.value.image.json,
                annotations: subsection.value.annotations.value.map(annotation => ({
                  id: annotation.id,
                  description: {
                    id: annotation.value.content.id,
                    value: annotation.value.content.value
                  },
                  order: annotation.value.order.json,
                  position: annotation.value.position.json
                }))
              };
            }
          })
          .sort((a, b) => a.order - b.order)
      };
    }).sort((a, b) => a.order - b.order);

  return {
    tableOfContents,
    contents
  };
}
