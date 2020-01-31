
const url_feed = 'https://facebook.tracking.exposed/feeds/0';
/* this URL is included in the produced feeds URL */

var getToken = function() {
  const token = window.location.href.split('/').pop().substr(1, 40);
  if (_.size(token) != 40 ) {
    console.log("Wrong token length in the URL");
    return "";
  }
  return token;
}

var buildApiUrl = function(apiName) {
    const SERVER = 'http://localhost:8000';
    let option = null; 
    let apiv =2;
    let rv = null;
    const api_path = apiv ? `/api/v${apiv}` : "/api/v1";
    if (window.location.origin.match(/localhost/)) {
        rv = option ? `${SERVER}${api_path}${apiName}/${option}` : `${SERVER}${api_path}${apiName}`;
        console.log(`Builing URL by hardcoded domains (development) URL composed ${rv}`);
    } else {
        rv = option ? `${api_path}${apiName}/${option}` : `${api_path}/${apiName}`;
        console.log(`Building URL by window...href (production) URL composed ${rv}`);
    }
    return rv;
}
