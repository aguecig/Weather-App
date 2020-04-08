const request = require('request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWd1ZWNpZyIsImEiOiJjazF6czJlMmUwZ25lM2ZwYzh2ZXpjZ202In0.EF7bD8-4EZb0tzBgRsxb3A&limit=1';

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services...', undefined);
      return;
    }
    else if (body.features.length == 0) {
      callback('Unable to find location...', undefined);
      return;
    }

    const longitude = body.features[0].center[0];
    const latitude = body.features[0].center[1];
    const location = body.features[0].place_name;
    callback(undefined, {
      longitude,
      latitude,
      location
    });

  });
}

module.exports = geocode;
