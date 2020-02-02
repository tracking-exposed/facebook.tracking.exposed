const DAYSAGO = 15;

const clist = [{
    API: buildApiUrl('statistics/supporters/day', 15, 2),
    bindto: '#supporters-graph',
    data : {
        mimeType: 'json',
        xFormat: '%Y-%m-%dT%H:%M:%S.000Z',
        keys: { value : [ 'newcomers' ], x: 'day' },
        type: 'bar',
        axes: {
            'newcomers': 'y'
        },
        colors: {
            'newcomers': _.first(palette)
        },
        labels: { show: true },
    },
    legend: { show: false },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d',
            },
        }
    }
}, {
    API: buildApiUrl('statistics/active/day', 15, 2),
    bindto: '#active-graph',
    data : {
        mimeType: 'json',
        xFormat: '%Y-%m-%dT%H:%M:%S.000Z',
        keys: { value : [ 'active' ], x: 'day' },
        type: 'bar',
        axes: {
            'active': 'y'
        },
        colors: {
            'active': _.last(palette)
        },
        labels: { show: true },
    },
    legend: { show: false },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d',
            },
        }
    }
}, {
    API: buildApiUrl('statistics/processing/day', 15, 2),
    bindto: '#processing-graph',
    data : {
        mimeType: 'json',
        xFormat: '%Y-%m-%dT%H:%M:%S.000Z',
        keys: { value : [ 'failure', 'successful', 'unprocessed', 'total'  ], x: 'day' },
        type: 'bar',
        colors: {
            'failure': palette[0],
            'unprocessed': palette[2],
            'successful': palette[4],
            'total': palette[1],
        },
        groups: [ [ 'successful', 'failure', 'unprocessed' ] ],
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d',
            },
        },
    }
}, {
    API: buildApiUrl('statistics/impressions/day', 15, 2),
    bindto: '#impressions-graph',
    data : {
        mimeType: 'json',
        xFormat: '%Y-%m-%dT%H:%M:%S.000Z',
        keys: {
            value : [ 'private', 'public', 'experiental', 'total' ],
            x: 'day'
        },
        types: {
            'total': 'bar',
            'private': 'bar',
            'public': 'bar',
            'experimental': 'bar',
        },
        colors: {
            'total': palette[0],
            'private': palette[1],
            'public': palette[2],
            'experimental': palette[3],
        },
        groups: [ [ 'private', 'public', 'experimental' ] ],
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d',
            }
        },
    }
}, {
    API: buildApiUrl('statistics/timelines/day', 15, 2),
    bindto: '#timelines-graph',
    data : {
        mimeType: 'json',
        xFormat: '%Y-%m-%dT%H:%M:%S.000Z',
        keys: {
            value : [ 'skipped', 'newsfeed', 'total' ],
            x: 'day'
        },
        types: {
            'total': 'bar',
            'skipped': 'bar',
            'newsfeed': 'bar',
        },
        colors: {
            'total': palette[0],
            'skipped': palette[1],
            'newsfeed': palette[2],
        },
        groups: [ [ 'newsfeed', 'skipped' ] ],
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d',
            }
        },
    }
}, {
    API: buildApiUrl('statistics/metadata/day', 15, 2),
    bindto: '#metadata-graph',
    data : {
        mimeType: 'json',
        xFormat: '%Y-%m-%dT%H:%M:%S.000Z',
        keys: {
            value : [ 'publicationTime', 'attributed', 'haslinks', 'texts', 'commentable', 'total' ],
            x: 'day'
        },
        types: {
            'publicationTime': 'line', 
            'attributed': 'line',
            'haslinks': 'line',
            'texts': 'line',
            'commentable': 'line',
            'total': 'line',
        },
        colors: {
            'publicationTime': palette[0],
            'attributed': palette[1],
            'haslinks': palette[2],
            'texts': palette[3], 
            'commentable': palette[4], 
            'total': palette[5],
        },
    },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d',
            }
        },
    }









}];


$(document).ready(async function() {

    var graphNodes = $('.c3graph');
    console.log("Retrieved", _.size(graphNodes), "from the impact.md page");

    const graphs = _.compact(_.map(graphNodes, function(graph) {
        var graphId = '#' + graph.id;

        const config = _.find(clist, { bindto: graphId });
        if(!config) {
            console.log("Invalid ID", graphId, "not found among the c3 configs");
            return null;;
        }
        return {
            config,
            graphId
        }
    }));

    for (const g of graphs) {
        const connection = await fetch(g.config.API);
        const content = await connection.json();
        if(content.error) {
            console.log("Error received!", g.graphId, JSON.stringify(content));
        } else if (!_.size(content)) {
            console.log("Empty answer for", g.graphId, JSON.stringify(content));
        } else {
            console.log("Generating graph", g.graphId, g,
                        "Retrieved", _.size(content),
                        "adding to config.data https://c3js.org/reference.html");
            g.config.data.json = content;
            const retval = c3.generate(g.config);
            // retval currently not used for updates
        }
    }
});
