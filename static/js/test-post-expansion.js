
let lastday = null;
function getDayOnlyIfNew(post) {
  // first issue: to let you compare the data, I should not provide only the full ISO date
  // at the moment post.impressionTime = "2019-04-09T11:39:31.000Z" this is not OK because we need
  // a quick check the day is different from the previous.

  // for sure, if you query the API with a specific day as URL, you'll get all the same date. but
  // this might not be the only use case, so TODO I've to return a new field with the day only.

  // I'm using .substr(0, 10) to get the day
    const day = post.impressionTime.substr(0, 10);
    const newday = ( lastday != day ) ? day : null;

    // condition when lastday is not set, because is the first iteration
    if(!lastday)
      lastday = day;

    // condition when the day is changed in the post list, which happens if in the API you don't specify any date
    if(lastday != day)
      lastday = day;

    // if the day is the same, don't return anything
    return newday ? '<td>' + day + '</td>' : '<td></td>';
}

function getTopicsifAny(post) {
    if(post.labels) {
      return '<td> Language:' + post.lang + '<br>'  + _.map(post.labels, function(l) { return '<h3>' + l + '</br></h3>'}) + '</td>';
    } else if(post.textsize) {
      return '<td>' + post.textsize  + '<smaller class="textdump"></br>' + _.map(post.texts, function(t) { return t + '</br>'; }) + '</smaller></td>';
    } else
      return '<td></td>';
}

function getMetadata(post) {

    const listofMetadata = ['nature', 'source', 'fblinktype'];

    // first metadata we can use as they are (nature and fblinktype can become icons or something else, they are also the same elements reported on the left column of 'reality-check', and can be used as filter)
    let content = _.reduce(listofMetadata, function(memo, k) {
        const info = _.get(post, k);
        if(!info)
          return memo;

        memo += "<small>" + info + "</small><br>";
        return memo;
    }, "")

    // very lame interruption
    if(_.size(content))
      content += "<code>*********************</code><br>";

    // some metadata which can be render with icons
    const listofReactions = ['LOVE', 'HAHA', 'ANGRY', 'WOW', 'LIKE'];
    content = _.reduce(listofReactions, function(memo, k) {
        const amount = _.get(post, k);
        if(!amount)
          return memo;

        memo += k + ':' + '<code><' + amount + '>  </code>';
        return memo;
    }, content);

    return '<td>' + content + '</td>';
}

function appendPostContent(post) {

    const firstColumn = getDayOnlyIfNew(post);
    const secondColumn = getTopicsifAny(post);
    const thirdColumn = getMetadata(post);

    const newpostentry = '<tr>' + firstColumn + secondColumn + thirdColumn + '</tr>';
    // this append a table row. Probably (?) it should be done with three div instead of a table
    $('#fbtrexContent > tbody:last-child').append(newpostentry);
};

function testPostExpansion() {
/* in this example, the API url is hardcoded and the token is pick by an hackish function.
   the 'getToken' and 'buildApiUrl' are the proper methods, not this */
  const token = "feac5539a53ce38c85a5fb116c5a091aec80f579";
  const url = `https://testing.tracking.exposed/api/v2/personal/${token}/enrich/`;

  $.getJSON(url, (data) => {
    _.each(data, appendPostContent);
    $('.textdump').hide();
  });


};
