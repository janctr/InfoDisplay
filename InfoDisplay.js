define([
    'qlik',
    './properties',
    './render',
    './util',
    'text!./index.html',
    'css!./index.css',
], function (qlik, properties, render, Util, template) {
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
        definition: properties,
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
            },
        ],
    };
});
