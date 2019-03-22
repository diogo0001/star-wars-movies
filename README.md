# Star Wars Movies
This application shows all the Star Wars Movies sorted by release year.

## Features

Fetch the data from the [swapi.co/api/films](https://swapi.co/api/films) and show all the movies in a table.

The title fonts are from SW theme.

You can click on each movie for more detais, the page scrolls to the details window (animation).

Clear button for details.

Details are: Director, sinopse, characters.

The UI has the SW themes and colors

Page available [here](https://swmovies.herokuapp.com/).

## Technologies

For this application were used:

 - [Javascript/ES6](https://www.w3schools.com/js/js_es6.asp) - for dynamic behavior, data fetching.
 - [HTML](https://www.w3schools.com/html/default.asp) - for page structure.
 - [CSS](https://www.w3schools.com/css/default.asp) - for styles.
 
The data fetching were done with axios, one JS library for this porpouse.

A simple backend script were done in Node.js just to deploy the page on Heroku.

## Dependencies

 - [Axios](https://www.npmjs.com/package/axios) - data fetching
 - [Npm](https://www.npmjs.com/) - packages 
 - [Node.js](https://nodejs.org/en/) - backend 
 - [Express](https://expressjs.com/) - server
 - [Heroku](https://www.heroku.com/platform) - deploy via gitHub

### Observations

The axios library can present a certain slowness when loading the characters list, which requests were done serially and not in parallel (async). Due to being a dynamic list, I could not find an efficient way to make this requests. However, it is a practical library to use.



