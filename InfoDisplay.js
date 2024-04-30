define(['qlik', 'text!./index.html', 'css!./index.css'],
    function (qlik, template) {
        return {
            template: template,
            initialProperties: {
                qHyperCubeDef: {
                    qDimensions: [],
                    qMeasures: [],
                    qInitialDataFetch: [
                        {
                            qWidth: 10,
                            qHeight: 999
                        }
                    ]
                }
            },
            definition: {
                type: 'items',
                component: 'accordion',
                items: {
                    dimensions: {
                        uses: 'dimensions',
                        min: 1,
                    },
                    sorting: {
                        uses: 'sorting'
                    },
                    addons: {
                        uses: 'addons',
                    },
                    settings: {
                        uses: 'settings'
                    }
                }
            },
            support: {
                snapshot: true,
                export: true,
                exportData: false
            },
            paint: function ($element, layout) {
                const baseContainer = $('.parent-container');
                baseContainer.empty();

                const results = layout.qHyperCube.qDataPages[0].qMatrix;

                // loops through params passed and identifies specific characters to dynamically style elements.
                // uses regex to replace certain chars to highlight

                function nestedListGen(arr, ul) {
                    for (let i=0; i<arr.length; i++) {
                        let level = 0;
                        for (let j=0; j<arr[i].length; j++) {
                            if (arr[i][j] === '^') {
                                level = level + 1;
                            } else {
                                break;
                            }
                        }

                        const text = arr[i].slice(level);
                        let li = $('<div>').text(text);
                        let highlightedString = text.replace(/\[([^\]]+)\]/g, '<mark>$1</mark>');

                        li.html(highlightedString)

                        //switch statement to find out whawt depth and bullet type
                        let bullet;
                        switch (level) {
                            case 1: bullet = String.fromCharCode(8226);
                                break;
                            case 2: bullet = String.fromCharCode(9675);
                                break;
                            case 3: bullet = String.fromCharCode(8226);
                                break;
                            case 4: bullet = String.fromCharCode(9675);
                                break;
                            case 5: bullet = String.fromCharCode(8226);
                                break;
                        }

                        if (level > 0) {
                            li.prepend(bullet + ' ');
                        }

                        li.addClass(`ul-level-${level}`);
                        ul.append(li);
                    }
                    return ul;
                }


                // loops through params to map and trim information to display into card
                // conditional statement to determine if it is archived or active
                for (let i=0; i<results.length; i++) {
                    const title = results[i][0].qText;
                    const summary = results[i][1].qText.split('\n').map(item => item.trim());
                    const display = results[i][2].qText;

                    const card = $('<div/>').html(`<div class="pdf-item-title">${title}</div>`);
                    const ul = $("<div class='ul-level-1'>");
                    const renderMyCard = nestedListGen(summary, ul);
                    renderMyCard.appendTo(card);

                    display === 'Archive' || display === 'Email' ? null : card.appendTo(baseContainer);
                }

                return qlik.Promise.resolve();
            },
            controller: ['$scope', function ($scope) {
                const layout = $scope.layout;
            }]
        }
    }
)