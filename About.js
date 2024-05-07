define([
    'client.property-panel/components/components',
    'client.property-panel/component-utils',
], function (components, componentUtils) {
    return function () {
        if (!components.hasComponent('About')) {
            let copyright = `<div class="pacom-about">
          <h4>Extension name: "InfoDisplay"</h4>
          <h4>How To</h4>
          <p>
            In the "Dimensions" panel, specify two dimensions: one for the title and one for the summary/description.
          </p>
         
          <p>
            In the "Info Columns" panel, specify the names of the title and summary fields.
          </p>

          <p>
            To set a filter if you want to selectively show columns, add a column(s) in the "Measures" panel.
          </p>

        </div>`;

            let html = copyright;

            let aboutComponent = {
                template: html,
                controller: [
                    '$scope',
                    function (scope) {
                        let data = function () {
                            return scope.data;
                        };
                        componentUtils.defineLabel(
                            scope,
                            scope.definition,
                            data,
                            scope.args.handler
                        ),
                            componentUtils.defineVisible(
                                scope,
                                scope.args.handler
                            ),
                            componentUtils.defineReadOnly(
                                scope,
                                scope.args.handler
                            ),
                            componentUtils.defineChange(
                                scope,
                                scope.args.handler
                            ),
                            componentUtils.defineValue(
                                scope,
                                scope.definition,
                                data
                            ),
                            (scope.getDescription = function (description) {
                                return 'About' === description;
                            });
                    },
                ],
            };
            return (
                components.addComponent('About', aboutComponent), aboutComponent
            );
        }
    };
});
