$(document).ready(function() {

    var graphNodes = $('.c3graph');

    const clist = [{
        bindto: '#impression-graph',
        data : {
            url: '/api/v2/statistics/impressions/day/15',
            mimeType: 'json',
            xFormat: '%Y-%m-%dT%H:%M:%S.000Z',
            keys: { value : [ 'public', 'private', 'total' ], x: 'day' },
            types: {
                'public': 'bar',
                'private': 'bar',
                'total': 'scatter'
            },
            groups: [ [ 'public', 'private' ] ],
            axes: {
                'public': 'y',
                'private': 'y',
                'total': 'y',
            },
            colors: {
                'public': '#3b5898',
                'private': '#eee',
                'total': 'black'
            }
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%d',
                    culling: { max: 5 }
                },

            }
        }
    }, /* c3 */
    {
        bindto: '#timelines-graph',
        data : {
            url: '/api/v2/statistics/timelines/day/15',
            mimeType: 'json',
            xFormat: '%Y-%m-%dT%H:%M:%S.000Z',
            keys: { value : [ 'newsfeed', 'skipped' /*, 'total' */ ], x: 'day' },
            types: {
                'newsfeed': 'bar',
                'skipped': 'bar',
                'total': 'scatter'
            },
            axes: {
                'newsfeed': 'y',
                'skipped': 'y',
                'total': 'y',
            },
            colors: {
                'newsfeed': '#3b5898',
                'skipped': '#eee',
                'total': 'black'
            }
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%d',
                    culling: { max: 5 }
                },

            }
        }
    }, /* c3 */
    {
        bindto: '#processing-graph',
        data : {
            url: '/api/v2/statistics/processing/day/15',
            mimeType: 'json',
            xFormat: '%Y-%m-%dT%H:%M:%S.000Z',
            keys: { value : [ 'failure', 'successful', 'unprocessed', 'total' ], x: 'day' },
            types: {
                'failure': 'bar',
                'unprocessed': 'bar',
                'successful': 'line',
                'total': 'line',
            },
            axes: {
                'failure': 'y',
                'unprocessed': 'y',
                'successful': 'y2',
                'total': 'y2',
            },
            colors: {
                'failure': 'black',
                'unprocessed': '#eee',
                'successful': '#3b5898',
                'total': 'green'
            }
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%d',
                    culling: { max: 5 }
                },

            },
            y2: { show: true }
        }
    }, /* c3 */ ];

    const graphs = _.map(graphNodes, function(graph) {
        var graphId = '#' + graph.id;
        var config = _.find(clist, { bindto: graphId });
        if(config) {
            console.log("Generating graph", graphId);
            var r = c3.generate(config);
        } else {
            console.log("Invalid ID", graphId);
        }
    });

});
