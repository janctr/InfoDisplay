define(['./util'], function (Util) {
    const {
        getColumnNumber,
        getObjectId,
        getObjectTitleId,
        getObjectContentId,
        nestedListGen,
    } = Util;

    return async function render(layout) {
        console.log('InfoDisplay layout: ', layout);

        const {
            title: { titleField },
            summary: { summaryField },
        } = layout.infoColumnSettings;

        const baseContainer = $(
            `#${getObjectContentId(layout)} .parent-container`
        );

        baseContainer.empty();

        const results = layout.qHyperCube.qDataPages[0].qMatrix;

        let titleIndex = 0,
            summaryIndex = 1;

        if (titleField)
            titleIndex = getColumnNumber(layout.qHyperCube, titleField);
        if (summaryField)
            summaryIndex = getColumnNumber(layout.qHyperCube, summaryField);

        // loops through params to map and trim information to display into card
        // conditional statement to determine if it is archived or active
        for (let i = 0; i < results.length; i++) {
            const title = results[i][titleIndex].qText;
            const summary = results[i][summaryIndex].qText
                .split('\n')
                .map((item) => item.trim());

            const card = $('<div/>').html(
                `<div class="pdf-item-title">${title}</div>`
            );

            const ul = $("<div class='ul-level-1'>");
            const renderMyCard = nestedListGen(summary, ul);
            renderMyCard.appendTo(card);

            card.appendTo(baseContainer);
        }
    };
});
