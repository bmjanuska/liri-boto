var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: <288ef9bd6adf439fba0ba5d24305390e>,
  secret: <7773738f9ec14188b197d9b96b7d123e>
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});