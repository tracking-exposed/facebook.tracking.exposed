let $grid;

/* in regards to the API used in this file, please consult
 * the file in content/api-documentation.md */

const posts = {}

function initializeToken() {
  const token = getToken();
  $('#token').text(token);
}

function initializeDaily() {
  const token = getToken();
  const url = buildApiUrl(`/personal/${token}/daily/0-3`);

  $.getJSON(url, (data) => {
    let daily = ''
 
    _.forEach(data, function(item, count) {
        let hasBorder = '';
        if (count > 0 ) {
            hasBorder = 'graph-day-border'
        }

        daily = `<div class="graph-day flex-fill pl-3 pr-3 ${hasBorder}">
            <span class="text-muted">${moment(item.day).format('LL')}</span><br>
            <span class="seconds">${Math.round(item.totalSeconds / 60)}</span><br>
            Minutes Spent<br>
            <div id="daily-pie-${count}" class="daily-pie"></div>
            <p><span class="posts">${item.npost}</span><br>
            Posts Read</p>
        </div>`;
        $('#daily-overview').append(daily)

        let pieId = `#daily-pie-${count}`;
        let pieChart = c3.generate({
            bindto: pieId,
            data: {
                columns: [
                    ['organic', item.nature.organic],
                    ['ads', item.nature.sponsored]
                ],
                type: 'pie',
                labels: false
            },
            color: {
                pattern: ['#3b5898', '#d9d9d9']
            },
            legend: {
                show: false
            },
            size: {
                height: 180,
                width: 180
            }
        });

        showSpecificDay(item.day);
    });

    $('#dailyTab a').on('click', function(e) {
        e.preventDefault()
        console.log($(this));
    });
  });
}

function showSpecificDay(day) { 
    day = day.replace('-06-', '-09-');

    const token = getToken();
    const url = buildApiUrl(`/personal/${token}/enrich/${day}`);

    $.getJSON(url, (data) => {
        let dayViz = ''
        const semanticIds = {};
        const htmlDay = `
            <div class="row mb-3 bg-light">
                <div class="col-lg-12">
                    <h3>On ${moment(day).format('LL')}</h3>
                </div>
            </div>
        `;

        $('#daily-timeline').append(htmlDay); 

        // build topics
        _.forEach(data, function(item, count) {
            if (item.labels != undefined) {

                // depending on occurence
                if (semanticIds[item.semanticId]) {
                    semanticIds[item.semanticId] = semanticIds[item.semanticId] + 1;
                    $('#daily-seen-' + item.semanticId).html('Seen ' + semanticIds[item.semanticId] + 'x');
                } else {
                    semanticIds[item.semanticId] = 1;

                    let isAd = '';
                    let seenCount = 'Seen once';
                    let topicsCount = {}

                    _.forEach(item.labels, function(topic, count) { 
                        if (topicsCount[topic]) {
                            topicsCount[topic] = topicsCount[topic] + 1;
                        } else {
                            topicsCount[topic] = 1;
                        }        
                    });

                    // topics
                    let htmlTopic = `<ul class="list-inline">`;
                    _.forEach(topicsCount, function(count, topic) {
                        if (count > 1) {
                            htmlTopic += `<li class="list-inline-item">
                                <span class="bg-dark text-light">${count}</span> ${topic}
                            </li>`;
                        } else {
                            htmlTopic += `<li clas="list-inline-item">${topic}</li>`;
                        }
                    });

                    // post
                    if (item.nature == 'sponsored') {
                        isAd = '(Advertisement)';
                    }

                    const htmlPost = `
                        <p>${item.texts[0]}</p>
                        See <a href="https://facebook.com${item.permaLink}">Original</a>
                    `;

                    const htmlItem = `
                    <div id="daily-${day}-${item.semanticId}" class="row">
                        <div id="daily-topics-${day}-${item.semanticId}" class="col-sm-4 col-lg-3">
                            <strong>Topics</strong>
                            ${htmlTopic}
                        </div>
                        <div id="daily-post-${day}-${item.semanticId}" class="col-sm-8 col-lg-9">
                            <strong class="float-left">
                                <a href="${item.sourceLink}">
                                    ${item.source}
                                </a>
                                ${isAd}
                            </strong>
                            <span id="daily-seen-${item.semanticId}" class="float-right text-muted">
                                ${seenCount}
                            </span>
                            <div class="clearfix"></div>
                            ${htmlPost}
                        </div>
                    </div>
                    <hr>`;

                    $('#daily-timeline').append(htmlItem); 
                }
            }
        });
    });
}


function initializeSummary(date, semanticIds) {
  const token = getToken();
  const url = buildApiUrl(`/personal/${token}/summary`);

  $.getJSON(url, (data) => {
    _.each(data, (item) => {

      const date = moment(item.publicationTime, moment.ISO_8601),
        readableDate = date.format('MMMM Do YYYY, hh:mm a'),
        unixTimestamp = date.format('x'),
        maxStringLength = 150;

      let bgColorClass, entryType, selectedText, teaserText, hasText = false;
      switch (item.fblinktype) {
        case 'photo':
          bgColorClass = 'border-success';
          entryType = 'picture';
          break;
        case 'videos':
          bgColorClass = 'border-primary';
          entryType = 'video';
          break;
        case 'groups':
          bgColorClass = 'border-warning';
          entryType = 'group';
          break;
        case 'events':
          bgColorClass = 'border-info';
          entryType = 'event';
          break;
        case 'posts':
          bgColorClass = 'border-secondary';
          entryType = 'post';
          break;
        default:
          if (item.nature == "sponsored") {
            bgColorClass = 'border-danger';
            entryType = 'advertisement';
          } else {
              console.log("unmanaged type: ")
              console.log(item);
          }
          break;
      }

      if (_.size(item.texts) && _.some(item.texts, _.size)) {
        /* are sure the texts[].text is order by the longest */
        selectedText = _.first(_.orderBy(item.texts, _.size));
        teaserText = selectedText.length > maxStringLength
          ? selectedText.substring(0, maxStringLength) + '…'
          : selectedText
        hasText = true;
      }

      let linkslot ="";
      if (_.startsWith(item.permaLink, '/')) {
        linkslot = `<a href="https://facebook.com${item.permaLink}" title="Original post" data-post_id="${item.postId}" target="_blank" class="small text-link">Original post</a>`;
      }
      else if (_.startsWith(item.permaLink, 'https://')) {
        linkslot = `<a href="${item.permaLink}" title="Original post" data-post_id="${item.postId}" target="_blank" class="small text-link">Original post</a>`;
      }

      const gridItem = `
        <div class="feed-item mb-3 p-2 ${item.fblinktype || ''}">
          <article class="content ${bgColorClass} d-flex flex-column">
            <header>${entryType || ''}</header>
            <section>
              <h4 class="author">${item.source}</h4>
              ${hasText ? `<p class="mb-0">${teaserText}</p>` : ''}
            </section>
            <section class="footer">
              <span class="small date" data-date="${unixTimestamp}">${readableDate}</span>
              ${linkslot}
            </section>
          </article>
        </div>
      `;
      $('#summary').append(gridItem); 
    });
    //initIsotope();
  });
};


function initIsotope() {
  $grid = $('.grid').isotope({
    // set itemSelector so .grid-sizer is not used in layout
    itemSelector: '.feed-item',
    percentPosition: true,
    masonry: {
      // use element for option
      columnWidth: '.grid-sizer'
    },
    getSortData: {
      postId: '[data-post-id parseInt]',
      date: '[data-date parseInt]',
      author: '.author',
    }
  });
}

function makeChartStacked() {
    var chartstacked = c3.generate({
        bindto: '#chart-stacked',
        data: {
            columns: [
                ['data1', -30, 200, 200, 400, -150, 250],
                ['data2', 130, 100, -100, 200, -150, 50],
                ['data3', -230, 200, 200, -300, 250, 250]
            ],
            type: 'bar',
            groups: [
                ['data1', 'data2']
            ]
        },
        grid: {
            y: {
                lines: [{value:0}]
            }
        }
    })

    setTimeout(function () {
        chartstacked.groups([['data1', 'data2', 'data3']])
    }, 1000);

    setTimeout(function () {
        chartstacked.load({
            columns: [['data4', 100, -50, 150, 200, -300, -100]]
        });
    }, 1500);

    setTimeout(function () {
        chartstacked.groups([['data1', 'data2', 'data3', 'data4']])
    }, 2000);

}

function filterBy(filter = '*') {
  $grid.isotope({ filter });
}

function sortBy(value = 'original-order') {
  $grid.isotope({ sortBy: value });
}

function downloadCSV() {
  const token = getToken();
  const url = buildApiUrl(`/personal/${token}/csv`);
  console.log("downloadCSV from: ", url);
  window.open(url);
}

/* stats page */
function newTimelineRow(timeline, impressionNumbers, n, totalT) {
    const rel = moment.duration(moment(timeline.impressionTime) - moment()).humanize();
    const when = moment(timeline.impressionTime).format("YYYY-MM-DD HH:mm");
    const url_csv = buildApilUrl(`/timeline/${timeline.timelineId}/csv`);

    return `<tr class="timeline">
        <td>${when}<br>#${n}/${totalT}</td>
        <td><a href="${url_csv}">${rel} ago <br>↓ link to .csv</a></td>
        <td>${impressionNumbers} impressions</td>
        <td></td>
        <td></td>
    </tr>`;
};

function composeImpression(impression, n, totalI) {
    /* PRIVATE IMPRESSION, NOT COLLECTED */
    if(!impression.htmlId) {
        return `<tr class="private alert-warning">
            <td>${impression.impressionOrder} of ${totalI}</td>
            <td>private</td>
            <td></td>
            <td></td>
        </tr>`;
    }
    /* OUR PARSERS BROKEN */
    if(!_.size(impression.summary)) {
        return `<tr class="unprocessed">
            <td>${impression.impressionOrder} of ${totalI}</td>
            <td>not processed?</td>
            <td></td>
            <td></td>
        </tr>`;
    }

    /* DEFAUT ROW */
    let info = _.size(impression.summary[0].displaySource) ? impression.summary[0].displaySource : '❌';
    console.log(info);
    return `<tr>
        <td>${impression.impressionOrder} of ${totalI}</td>
        <td>${impression.summary[0].nature}</td>
        <td>${impression.summary[0].source}</td>
        <td>${info}</td>
    </tr>`;
};

function initializeStats() {
  const token = getToken();
  const url = buildApiUrl(`/personal/${token}/stats`);
  console.log("timeline stats from: ", url);
  $.getJSON(url, (data) => {
    console.log(`Retrived ${_.size(data.content)} impressions, from ${_.size(data.timelines)} timelines, ${JSON.stringify(data.served)}, total stored: ${data.storedTimelines}`);
    let lastT = { id: null, counter: 0 };

    _.each(data.content, (impression) => {
      if(lastT.id != impression.timelineId) {
        lastT.id = impression.timelineId;
        lastT.counter += 1;
        let newtmln = newTimelineRow(
          _.omit(impression, ['summary']),
          _.get(data.timelines, impression.timelineId),
          lastT.counter, _.size(data.timelines) );
        $('#entries').append(newtmln);
      }

      let impre = composeImpression(impression, lastT.counter, _.get(data.timelines, impression.timelineId));
      $('#entries').append(impre);

    });
    $('#closing').append(shapeClosingMessage(_.size(data.timelines), data.storedTimelines));
  });
};

function shapeClosingMessage(avail, total) {
    return `<p class="timeline">Load the remaining ${total-avail} timelines, of a total stored of ${total}<br><small>NO, NOT YET IMPLEMENMTED, CHECK THE APIs</small></p>`;
}
