define(['qlik'], function (qlik) {
    function getObjectId(layout) {
        // You can use this to target elements specific to an object
        return layout.qInfo.qId;
    }

    function getObjectTitleId(layout) {
        // `header#${layout.qInfo.qId}_title` - targets the area at the top that leave unwanted whitespace;
        return `${layout.qInfo.qId}_title`;
    }

    function getObjectContentId(layout) {
        // `#${layout.qInfo.qId}_content` - targets the body of the object
        return `${layout.qInfo.qId}_content`;
    }

    // dimensions : [ { columnName: 'Title', nullSuppression: false }]
    function createHyperCube(dimensions) {
        console.log('hypercube dims: ', dimensions);
        return new Promise((resolve, reject) => {
            const qDimensions = dimensions.map((column) => {
                return {
                    qNullSupression: column.nullSuppression,
                    qDef: { qFieldDefs: [column.columnName] },
                };
            });
            // const qMeasures
            console.log('creating cube...');

            qlik.currApp().createCube(
                {
                    qDimensions: qDimensions,
                    qMeasures: [],
                    qInitialDataFetch: [
                        {
                            qWidth: qDimensions.length,
                            qHeight: 100,
                        },
                    ],
                },
                (reply) => {
                    resolve(reply);
                }
            );
        });
    }

    function nestedListGen(arr, ul) {
        // loops through params passed and identifies specific characters to dynamically style elements.
        // uses regex to replace certain chars to highlight
        for (let i = 0; i < arr.length; i++) {
            let level = 0;
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] === '^') {
                    level = level + 1;
                } else {
                    break;
                }
            }

            const text = arr[i].slice(level);
            let li = $('<div>').text(text);
            let highlightedString = text.replace(
                /\[([^\]]+)\]/g,
                '<mark>$1</mark>'
            );

            li.html(highlightedString);

            //switch statement to find out whawt depth and bullet type
            let bullet;
            switch (level) {
                case 1:
                    bullet = String.fromCharCode(8226);
                    break;
                case 2:
                    bullet = String.fromCharCode(9675);
                    break;
                case 3:
                    bullet = String.fromCharCode(8226);
                    break;
                case 4:
                    bullet = String.fromCharCode(9675);
                    break;
                case 5:
                    bullet = String.fromCharCode(8226);
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

    return {
        getObjectId,
        getObjectTitleId,
        getObjectContentId,
        createHyperCube,
        nestedListGen,
    };
});
