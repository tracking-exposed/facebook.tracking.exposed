
const url_feed = '/feeds/0'

var getToken = function() {
  const token = window.location.href.split('/').pop().substr(1, 40);
  if (_.size(token) != 40 ) {
    console.log("Wrong token length in the URL");
    return "";
  }
  return token;
}

var buildApiUrl = function(end) {
  let api_path = "/api/v2"
  const host = window.location.origin;
  const ret = `${host}${api_path}${end}`
  console.log(`buildApiUrl composed ${ret}`);
  return ret;
}
