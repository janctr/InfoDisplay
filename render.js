define(['./util'], function (Util) {
    const {
        createHyperCube,
        getObjectId,
        getObjectTitleId,
        getObjectContentId,
        nestedListGen,
    } = Util;

    return async function render(layout) {
        console.log('InfoDisplay layout: ', layout);
        console.log('Title column: ', layout.infoColumnSettings);

        if (
            !layout.infoColumnSettings ||
            !layout.infoColumnSettings.title ||
            !layout.infoColumnSettings.summary
            // !layout.infoColumnSettings.titleFieldNullSuppression ||
            // !layout.infoColumnSettings.summaryFieldNullSuppression
        )
            return;

        const {
            title: { titleField, titleFieldNullSuppression },
            summary: { summaryField, summaryFieldNullSuppression },
        } = layout.infoColumnSettings;

        const hyperCubeDimensions = [
            {
                columnName: titleField,
                nullSuppression: titleFieldNullSuppression,
            },
            {
                columnName: summaryField,
                nullSuppression: summaryFieldNullSuppression,
            },
        ];

        const cube = await createHyperCube(hyperCubeDimensions);

        console.log('cube: ', cube);

        const baseContainer = $(
            `#${getObjectContentId(layout)} .parent-container`
        );

        baseContainer.empty();

        const results = layout.qHyperCube.qDataPages[0].qMatrix;

        console.log('results: ', results);

        // loops through params to map and trim information to display into card
        // conditional statement to determine if it is archived or active
        for (let i = 0; i < results.length; i++) {
            const title = results[i][0].qText;
            const summary = results[i][1].qText
                .split('\n')
                .map((item) => item.trim());
            const display = results[i][2].qText;

            const card = $('<div/>').html(
                `<div class="pdf-item-title">${title}</div>`
            );
            const ul = $("<div class='ul-level-1'>");
            const renderMyCard = nestedListGen(summary, ul);
            renderMyCard.appendTo(card);

            display === 'Archive' || display === 'Email'
                ? null
                : card.appendTo(baseContainer);
        }
    };
});
