export default function convert(driveModel) {
  const tableOfContents = driveModel.value.sections.value
    .filter(section => !section.value.parent.json)
    .map(section => {
      const title = (/^#+ .+$/m).exec(section.value.content.value) || ['unnamed'];
      return {
        id: section.id,
        title: title[0].replace(/^#+ /, ''),
        subsections: driveModel.value.sections.value
          .filter(subsection => subsection.value.parent.json === section.id)
          .map(subsection => ({
            id: subsection.id,
            title: 'Subsection'
          })),
        order: section.value.order.json
      };
    }).sort((a, b) => a.order - b.order);

  const contents = driveModel.value.sections.value
    .filter(section => !section.value.parent.json)
    .sort((a, b) => a.value.order.json - b.value.order.json)
    .map((section, sectionIndex) => {
      return {
        id: section.id,
        content: section.value.content.value,
        order: section.value.order.json,
        type: section.value.type.json,
        subsections: driveModel.value.sections.value
          .filter(subsection => subsection.value.parent.json === section.id)
          .sort((a, b) => a.value.order.json - b.value.order.json)
          .reduce(({ annotationIndex, subsections }, subsection) => {
            if (subsection.value.type.json === 'text') {
              return {
                annotationIndex,
                subsections: subsections.concat({
                  id: subsection.id,
                  content: subsection.value.content.value,
                  order: subsection.value.order.json,
                  type: 'text'
                })
              };
            } else {
              return {
                annotationIndex: annotationIndex + subsection.value.annotations.value.length,
                subsections: subsections.concat({
                  id: subsection.id,
                  type: 'annotatedImage',
                  order: subsection.value.order.json,
                  image: subsection.value.image.json,
                  annotations: subsection.value.annotations.value.map((annotation, index) => ({
                    id: annotation.id,
                    description: {
                      id: annotation.value.content.id,
                      value: annotation.value.content.value
                    },
                    order: annotation.value.order.json,
                    position: annotation.value.position.json,
                    label: `${annotationIndex + index}`
                  }))
                }
              )};
            }
          }, { annotationIndex: 1, subsections: [] }).subsections

      };
    });

  return {
    tableOfContents,
    contents
  };
}
