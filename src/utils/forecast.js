const request = require('request');

const forecast = (lat, lon, callback) => {
  const url = `https://api.darksky.net/forecast/975390d41dbe2a898cfaa2b6d76808e6/${lat},${lon}?units=si`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to network...', undefined);
      return;
    }
    if (body.error) {
      callback('Unable to find location...', undefined);
      return;
    }

    const temperature = body.currently.temperature;
    const rainChance = body.currently.precipProbability;
    const summary = body.daily.summary;

    callback(undefined, {
      temperature,
      rainChance,
      summary
    });
  });
}

module.exports = forecast;
