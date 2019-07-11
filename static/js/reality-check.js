let $grid;

function initializeToken() {
  const token = getToken();
  $('#token').text(token);
}

function initializeSummary() {
  const token = getToken();
  const url = buildApiUrl(`/personal/${token}/summary`);

  $.getJSON(url, (data) => {
    console.log(`Retrived ${_.size(data)} objects`);
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