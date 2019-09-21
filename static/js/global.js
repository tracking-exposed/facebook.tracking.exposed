
let url_feed = "https://testing.tracking.exposed/feeds/0"

var getToken = function() {
  /*
    let token = "testing-token"
    return token;
  */
  const token = window.location.href.split('/').pop().substr(1, 40);
  if (_.size(token) != 40 ) {
    console.log("Wrong token length in the URL");
    return "";
  }
  return token;
}

var buildApiUrl = function(end) {
  let api_path = "/api/v2"
  const host = 'https://testing.tracking.exposed' // window.location.origin;
  const ret = `${host}${api_path}${end}`
  console.log(`double check: URL composed ${ret}`);
  return ret;
}
