const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express config
const port=process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up handle bars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to save
app.use(express.static(publicDirectoryPath));

//Routes for our projects

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew Mead",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({
            error: "THe was an error with the forecasdt",
          });
        }
        res.send({
          forecast: forecastdata,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me ",
    name: "Andrew Mead",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Sahid",
    message: "Help Page",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 not found",
    name: "Sahid Rojas",
    error: "Help article is not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 not found",
    name: "Sahid Rojas",
    error: "Page  is not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port "+port);
});
