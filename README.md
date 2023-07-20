# Movie-Finder

## User Story

```
As A movie lover who wants to find a movie with a specific actor,
I WANT to find movies with a specific actor on their respective streaming services
So THAT I can find where to enjoy my movie
```

## Acceptance Criteria

```
GIVEN that the user visits the movie finder application
WHEN the user lands on the webpage
THEN  the user should see a search bar with a search button
WHEN the user clicks on the search bar and types an actor or actress and clicks the search button
THEN  the user should see a list of movies featuring that person with the streaming site the movie is available on
WHEN the user clicks on the search button
THEN  the name of the actor or actress is stored in localStorage and in a list below the search bar
WHEN the user clicks on a movie in the list
THEN  the web application redirects the user to the streaming website where the movie was found
```

## Description

We created a movie finder application to find movies with a specific actor or actress. This application allows the user explore movies effortlessly, and increasing the likelihood of finding something enjoyable to watch. The movie finder app also displays the streaming service the movie is on and a link to that movie on its respective platform. This eliminates the frustration of searching multiple streaming platforms to find a movie to watch. 

## Usage

When the user loads up the webpage, you will see our movie finder heading, and a search bar for an actor or actress. When an actors name is inputed into the search bar, a movie carousel will be generated with that actors top 10 movies. Each movie is presented as a card that, when hovered over, shows the name, description, and streaming platform of the movie. Your search is also saved to local storage and displayed as a button under the search bar you can easily click to search for that actor/actress again. 

## Credits

- [Nick Bicknell](https://github.com/NickBicknell)
- [Antonios Zikos](https://github.com/pcjitsu)
- [Kevin Tortolini](https://github.com/ktortolini)
- [Streaming Availability API](https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability)
- [Actor Movie API](https://rapidapi.com/AbhishekBhatt072003/api/actor-movie-api1/)

## Screenshots

![Movie-Finder](./assets/images/movie-finder-demo.png?raw=true)

## Link to Application

[Movie-Finder](https://nickbicknell.github.io/movie-finder/)