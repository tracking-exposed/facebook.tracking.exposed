const dev = true

let url_feed = "https://facebook.tracking.exposed/feeds/0"
if (dev) {
    url_feed = "https://testing.tracking.exposed/feeds/0/"
}

function getToken() {
  if (dev) {
    let t = "testing-token"
  } else {
    let t = _.find(window.location.pathname.split('/'), function(e) {
        return _.size(e) == 40;
    });
  }
  if(!t) console.log("Wrong token length in the URL");
  return t;
}

buildApiUrl = function(end) {

    let api_path = "/api/v2"
    if (dev) {
        api_path = "/fixtures"
    }

    return `${window.location.origin}/${api_path}/${end}`
}
