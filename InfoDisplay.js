define([
    'qlik',
    './render',
    './util',
    'text!./index.html',
    'css!./index.css',
], function (qlik, render, Util, template) {
    const { getObjectId, getObjectTitleId, getObjectContentId, nestedListGen } =
        Util;

    return {
        template: template,
        initialProperties: {
            qHyperCubeDef: {
                qDimensions: [],
                qMeasures: [],
                qInitialDataFetch: [
                    {
                        qWidth: 10,
                        qHeight: 999,
                    },
                ],
            },
        },
        definition: {
            type: 'items',
            component: 'accordion',
            items: {
                infoColumnSettings: {
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
                                titleFieldNullSuppression: {
                                    ref: 'infoColumnSettings.title.titleFieldNullSuppression',
                                    type: 'boolean',
                                    label: 'Include null values',
                                    defaultValue: false,
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
                                summaryFieldNullSuppression: {
                                    ref: 'infoColumnSettings.summary.summaryFieldNullSuppression',
                                    type: 'boolean',
                                    label: 'Include null values',
                                    defaultValue: false,
                                },
                            },
                        },
                    },
                },
                dimensions: {
                    uses: 'dimensions',
                    min: 1,
                },
                measures: {
                    uses: 'measures',
                    min: 0,
                },
                sorting: {
                    uses: 'sorting',
                },
                addons: {
                    uses: 'addons',
                },
                settings: {
                    uses: 'settings',
                },
            },
        },
        support: {
            snapshot: true,
            export: true,
            exportData: false,
        },
        paint: function ($element, layout) {
            render(layout);

            return qlik.Promise.resolve();
        },
        controller: [
            '$scope',
            function ($scope) {
                const layout = $scope.layout;

                console.log('layout: ', layout);
            },
        ],
    };
});
