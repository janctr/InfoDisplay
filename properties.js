define(['./About', './util'], function (About, Util) {
    About(); // Initialize About panel

    const aboutSection = {
        type: 'items',
        translation: 'About',
        items: {
            about: {
                component: 'About',
                translation: 'About',
            },
        },
    };

    const infoColumnSettings = {
        type: 'items',
        component: 'expandable-items',
        label: 'Info Columns',
        translation: 'Info Columns',
        grouped: true,
        ref: 'infoColumnSettings',
        items: {
            titleFieldSection: {
                type: 'items',
                label: 'Title field settings',
                translation: 'Title field settings',
                ref: 'infoColumnSettings.title',
                items: {
                    titleField: {
                        type: 'string',
                        ref: 'infoColumnSettings.title.titleField',
                        label: 'Title Field',
                        defaultValue: '',
                        expression: 'optional',
                    },
                },
            },
            summaryFieldSection: {
                type: 'items',
                label: 'Summary field settings',
                translation: 'Summary field settings',
                ref: 'infoColumnSettings.summary',
                items: {
                    summaryField: {
                        type: 'string',
                        ref: 'infoColumnSettings.summary.summaryField',
                        label: 'Summary Field',
                        defaultValue: '',
                        expression: 'optional',
                    },
                },
            },
        },
    };

    const dimensions = {
        uses: 'dimensions',
        min: 1,
        max: 2,
    };
    const measures = {
        uses: 'measures',
        min: 0,
    };
    const sorting = {
        uses: 'sorting',
    };
    const addons = {
        uses: 'addons',
    };
    const settings = {
        uses: 'settings',
    };

    return {
        type: 'items',
        component: 'accordion',
        items: {
            infoColumnSettings,
            dimensions,
            measures,
            sorting,
            addons,
            settings,
            aboutSection,
        },
    };
});
