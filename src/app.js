const path = require('path');

const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');

const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const staticPath = path.join(__dirname, '../public');  // need to set up an absolute path to get the static files
const viewsPath = path.join(__dirname, '../templates/views'); // we can customize the path to the views files (default name is views on the same level of the src folder)
const partialsPath = path.join(__dirname, '../templates/partials');

// setup hbs engine and views location
app.set('view engine', 'hbs');  // to use hbs, install via npm. It is used to set up dynamic views
app.set('views', viewsPath); // customize path to the views files
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(staticPath));

app.get('', (req, res) => {
  res.render("index", {  // context to be passed in
    title: 'Weather...',
    name: 'Sylvest'
  });
});

app.get('/about', (req, res) => {
  res.render("about", {
    title: 'About...',
    name: 'Sylvest'
  });
})

app.get('/help', (req, res) => {
  res.render("help", {
    title: 'Help...',
    name: 'Sylvest'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address was provided'
    });
  }

  let address = req.query.address;

  geocode( address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({
        error: 'Could not find location'
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: 'Could not find location'
        });
      }
      res.send({
        temperature: forecastData.temperature,
        rainChance: forecastData.rainChance,
        summary: forecastData.summary,
        address: location
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404 Error',
    page: 'Help page',
    name: 'Sylvest'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '404 Error',
    page: 'Page',
    name: 'Sylvest'
  });
});

app.listen(port, () => {
  console.log(chalk.inverse.yellow(`listening on port ${port}`));
});
