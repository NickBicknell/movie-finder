var actor;
var title;

//  Fetch Request to get Titles based off Actors Name
var url = "https://actor-movie-api1.p.rapidapi.com/getid/" + actor + "?apiKey=62ffac58c57333a136053150eaa1b587";
// const url = "https://actor-movie-api1.p.rapidapi.com/getid/Tom%20Holland?apiKey=62ffac58c57333a136053150eaa1b587";
var options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e7c2031dffmsha123315849343c2p1ba5fdjsn2ad30982319f",
    "X-RapidAPI-Host": "actor-movie-api1.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}

// Fetch Request for Getting Streaming Servies from Title of Movie

const url = "https://streaming-availability.p.rapidapi.com/v2/search/title?title=The%20Dark%20Knight&country=us&show_type=movie&output_language=en";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e7c2031dffmsha123315849343c2p1ba5fdjsn2ad30982319f",
    "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}
