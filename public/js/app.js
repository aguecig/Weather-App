console.log('client side js is loaded...');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const getWeather = (event) => {
  event.preventDefault();  // prevent page from refreshing on click

  const location = search.value;

  fetch(`/weather?address=${location}`)
  .then( (response) => {
    response.json()
    .then( (data) => {
      if (data.error) {
        $("#weather-summary").html(``);
        $("#error-message").html(`
          Could not get the weather for ${location} :(
          `);
        return;
      }

      const temperature = data.temperature;
      const rainChance = data.rainChance;
      const summary = data.summary;
      const address = data.address;

      $("#weather-summary").html(`
      ${address} <br> ${summary} <br> Temperature of ${temperature} Celsius <br> ${rainChance}% chance of rain
      `);
      $("#error-message").html(``);
    });
  });
}

weatherForm.addEventListener('submit', getWeather);
