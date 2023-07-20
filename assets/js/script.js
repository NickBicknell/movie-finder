// todo: set the api keys to variables
var apiKey = "e7c2031dffmsha123315849343c2p1ba5fdjsn2ad30982319f";
// sets global letiables
var previousSearchItems = [];
var enumeratorValue = 0;
var globalResponse = [];
var globalInputVal = [];
var globalStorageEl = [];
var globalStorageVal = [];
var globalStorageTxt = [];
var movieResult = "";
// todo: set variables with element references
var inputEl = document.querySelector(".input");
var formEl = document.getElementById("form-el");

// info: testing variables
// var actor = "ryan%20reynolds";
// var title = "summer%20catch";

// todo: set fetch functions, completed
// var url = "https://actor-movie-api1.p.rapidapi.com/getid/" + actor + "?apiKey=62ffac58c57333a136053150eaa1b587";

//  Fetch Request to get Titles based off Actors Name
var fetchActorMovies = async function (actorSearch) {
  // var url = "https://actor-movie-api1.p.rapidapi.com/getid/Tom%20Holland?apiKey=62ffac58c57333a136053150eaa1b587";
  var url = "https://actor-movie-api1.p.rapidapi.com/getid/" + encodeURI(actorSearch) + "?apiKey=62ffac58c57333a136053150eaa1b587";
  var options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${apiKey}`,
      "X-RapidAPI-Host": "actor-movie-api1.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const movieResults = await response.json();
    console.log(movieResults);
    // Sorts movies by going through each object; grabbing popularity key; and comparing values
    movieResults.sort((a, b) => {
      if (a.popularity > b.popularity) {
        return -1;
      }
      if (a.popularity < b.popularity) {
        return 1;
      }
      return 0;
    });
    // Takes the Top 10 Movies from output of MovieResults.Sort
    const popularMovies = movieResults.slice(0, 10);
    console.log(popularMovies);
    // Creates an empty array that will store all promises
    const movieTitleFetches = [];
    // Creates a function that for each movie in popular movies; pushes promises from fetStreamingServices each object.title
    popularMovies.forEach((movie) => {
      movieTitleFetches.push(fetchStreamingServicesBatch(movie.title));
    });
    // Once all promises in movieTitleFetches are resolved. passes that into Movie Stream Responses
    const moviesStreamResponses = await Promise.all(movieTitleFetches);
    // creates a new array populated with the results from moviestram responses and covnerting into JSON format
    const moviesStreamData = await Promise.all(moviesStreamResponses.map((response) => response.json()));
    console.log(moviesStreamData);
    //removes the first element from MoviesArray and returns the removed element.
    const moviesStreamCardData = moviesStreamData.map((moviesArray) => moviesArray.result.shift());
    console.log(moviesStreamCardData);
    populateCard(moviesStreamCardData, actorSearch);
  } catch (error) {
    console.error(error);
  }
};

// Fetch Request for Getting Streaming Services from Title of Movie

var fetchStreamingServices = async function (titleSearch) {
  // const url = "https://streaming-availability.p.rapidapi.com/v2/search/title?title=The%20Dark%20Knight&country=us&show_type=movie&output_language=en";
  const url = "https://streaming-availability.p.rapidapi.com/v2/search/title?title=" + encodeURI(titleSearch) + "&country=us&show_type=movie&output_language=en";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${apiKey}`,
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    // pushes the response to global
    globalResponse.push(response);
    const streamingResult = await response.json();
    console.log(streamingResult);
  } catch (error) {
    console.error(error);
  }
};

var fetchStreamingServicesBatch = function (titleSearch) {
  // const url = "https://streaming-availability.p.rapidapi.com/v2/search/title?title=The%20Dark%20Knight&country=us&show_type=movie&output_language=en";
  const url = "https://streaming-availability.p.rapidapi.com/v2/search/title?title=" + encodeURI(titleSearch) + "&country=us&show_type=movie&output_language=en";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": `${apiKey}`,
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  return fetch(url, options);
};

// todo: set event listeners


async function initSearch(searchEvent) {
  console.log("initSearch()");
  searchEvent.preventDefault();
  // first, get the value of the input text
  var searchString = inputEl.value.trim();
  // then, push it into the global array
  globalInputVal.push(searchString);
  console.log("globalInputVal:", globalInputVal);
  console.log("globalInputVal[0]:", globalInputVal[0]);
  // next, call the fetch function
  if (searchString) {
    await fetchActorMovies(searchString); // todo: change to searchString
    // // await fetchStreamingServices(title); // todo: change to [nameOfString]
    // await fetchStreamingServices(movieResult[0].title); // todo: change to [nameOfString]
    if (globalResponse) {
      // displays results
      console.log("globalResponse:", globalResponse);
    }
  } else {
    alert("!searchString");
  }
  // then, set the local storage
  // debugger;
  // setLocalStorage();
  // getLocalStorage();
  previousSearchItems.push(searchString);
  setLocalItems(previousSearchItems);
  getLocalItems();
}


function setLocalItems(items) {
  localStorage.setItem("previousSearches", JSON.stringify(items));
};

// function setLocalItems(items) {
//   localStorage.setItem("previousSearches", JSON.stringify(items));
// };

// function getLocalItems() {
//   historyEl.innerHTML = '';
//   const lsItems = localStorage.getItem("previousSearches");
//   if (localStorage.getItem("previousSearches")) {
//     console.log("This search is in local storage")
//     previousSearchItems = JSON.parse(lsItems) || [];
//     // const startingIndex = previousSearchItems.length - 3;
//     const maxThree = previousSearchItems.slice(-3);
//     maxThree.forEach(item => {
//       const button = document.createElement("span");
//       button.textContent = item;
//       button.classList.add("button", "is-link", "mx-2");
//       historyEl.appendChild(button);
//     });
//   } else {
//     console.log("This search is not in local storage")
  
//   }
  
// };

function getLocalItems() {
  historyEl.innerHTML = '';
  const lsItems = localStorage.getItem("previousSearches");
  previousSearchItems = JSON.parse(lsItems) || [];
  // const startingIndex = previousSearchItems.length - 3;
  const maxThree = previousSearchItems.slice(-3);
  maxThree.forEach(item => {
    const button = document.createElement("span");
    button.textContent = item;
    button.classList.add("button", "is-link", "mx-2");
    historyEl.appendChild(button);
  });
};



// todo: set local storage
function setLocalStorage() {
  console.log("setLocalStorage()");
  // sets the current index to retrieve the text area value
  globalStorageEl[enumeratorValue] = document.createElement("span");
  globalStorageEl[enumeratorValue].textContent = globalInputVal[enumeratorValue];
  document.body.appendChild(globalStorageEl[enumeratorValue]);
  var localStorageTxtValue = JSON.stringify(globalInputVal[enumeratorValue]);
  console.log("localStorageTxtValue:", localStorageTxtValue);
  // sets the value from above into local storage
  localStorage.setItem(`storage[${enumeratorValue}]`, localStorageTxtValue);
  enumeratorValue++;
}

var historyEl = document.getElementById("history");

// todo: finish this method
function getLocalStorage() {
  console.log("getLocalStorage()");
  var conditionalValue = enumeratorValue;
  for (var i = 0; i < conditionalValue; i++) {
    globalStorageTxt[i] = localStorage.getItem(`storage[${i}]`);
    globalStorageEl[i].textContent = globalStorageTxt[i];
    globalStorageEl[i].classList.add("button", "is-link", "mx-2");
    historyEl.appendChild(globalStorageEl[i]);
    console.log("test: ", globalStorageEl[i]);
    console.log("Text: ", globalStorageTxt);
  }
}



function destroyCarousel() {
  var carousels = bulmaCarousel.attach("#carousel-demo", {
    slidesToScroll: 1,
    slidesToShow: 1,
  });
  console.log("CAROUSELS", carousels[0]);
  // carousels[0].destroy();
}

function initCarousel(id) {
  var carouselId = id || "carousel-demo";
  console.log("INIT CAROUSEL", carouselId);
  bulmaCarousel.attach(`#${carouselId}`, {
    slidesToScroll: 1,
    slidesToShow: 1,
  });
}

function attachEventListeners() {
  historyEl.addEventListener("click", async function(event) {
    const element = event.target;
    if (element.matches('span')) {
      const searchText = element.textContent;
      await fetchActorMovies(searchText);
    }
  })
}

// todo: call functions
window.addEventListener("load", function () {
  // todo: call functions inside lambda function
  formEl.addEventListener("submit", initSearch);
  // adds the carousel to the DOM
  initCarousel();
  // getLocalStorage();
  getLocalItems();
  attachEventListeners();
});

var populateCard = function (moviesStreamCardData, actor) {
  console.log("Populate Card", moviesStreamCardData);
  // destroyCarousel();
  var newId = moviesStreamCardData[0].tmdbId;
  var carouselId = `${actor}_${newId}`.replaceAll(" ", "_");
  var elNewCarousel = $(`<div class='carousel' id='${carouselId}'></div>`);
  $(".carousel-container").empty().append(elNewCarousel);
  $("#carousel-demo").remove();

  for (i = 0; i < moviesStreamCardData.length; i++) {
    var movieTitle = moviesStreamCardData[i].title;
    var movieOverview = moviesStreamCardData[i].overview;
    var moviePoster = moviesStreamCardData[i].posterURLs.original;
    var streamingPlatform = Object.keys(moviesStreamCardData[i].streamingInfo.us)[0].toUpperCase();
    console.log("Streaming Platform: ", Object.keys(moviesStreamCardData[i].streamingInfo.us)[0].toUpperCase());
    var streamingPlatformLink = moviesStreamCardData[i].streamingInfo.us[Object.keys(moviesStreamCardData[i].streamingInfo.us)[0]][0].link;
    console.log("Link: ", moviesStreamCardData[i].streamingInfo.us[Object.keys(moviesStreamCardData[i].streamingInfo.us)[0]][0].link);

    var appendCard = `<div class="item-${i}">
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column card-width">
                    <a id="movie-link"
                        href="${streamingPlatformLink}">
                        <div class="card has-no-rounded is-bg-cover is-cursor-pointer transform is-duration-300 hover-translate-y"
                        style="background-image: url('${moviePoster}')">
                            <div class="card-content has-no-rounded is-duration-300 pt-24">
                                <div class="content">
                                    <div class="title-transform-y is-duration-300 mb-5">
                                        <!-- Movie Title -->
                                        <h3 id="movie-title" class="has-text-white-bis fs-title is-inline pt-2 pl-2 pb-2 mb-3">${movieTitle}</h3>
                                        <div class="underline-br"></div>
                                    </div>
                                    <div
                                        class="text-motion has-text-white-bis transform is-duration-300 hover-translate-y">
                                        <!-- Movie Desc -->
                                        <p id="movie-desc" class="ml-2 is-size-6">${movieOverview}</p>
                                        <!-- Streaming Platform -->
                                        <p id="streaming-platform" class="ml-2 is-size-6 is-underlined mb-2">Watch now on ${streamingPlatform}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>
    </div>`;

    elNewCarousel.append(appendCard);
  }

  // repopulate carousel
  initCarousel(carouselId);
};
