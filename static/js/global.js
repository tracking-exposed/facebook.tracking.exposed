const dev = true

let url_feed = "https://testing.tracking.exposed/feeds/0"
if (dev) {
    url_feed = "https://testing.tracking.exposed/feeds/0"
}

var getToken = function() {
  if (dev) {
    let token = "testing-token"
    return token;
  } else {
    let token = _.find(window.location.pathname.split('/'), function(e) {
        return _.size(e) == 40;
    });
    if (!token) {
      console.log("Wrong token length in the URL");
      return "";
    }
  }
}

var buildApiUrl = function(end) {

    let api_path = "/api/v2"
    if (dev) {
        api_path = "/fixtures"
    	end = end + ".json"
    }

    console.log(`double check: URL composed ${window.location.origin}${api_path}${end}`);
    return `${window.location.origin}${api_path}${end}`
}
