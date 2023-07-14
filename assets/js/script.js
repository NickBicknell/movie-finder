// todo: set the api keys to variables
var apiKey = 'e7c2031dffmsha123315849343c2p1ba5fdjsn2ad30982319f';
// sets global variables
var enumeratorValue = 0;
var globalResponse = [];
var globalInputVal = [];
var globalStorageEl = [];
var globalStorageVal = [];
var globalStorageTxt = [];

// todo: set variables with element references
var inputEl = document.querySelector('.input');
var formEl = document.getElementById('form-el');

// info: testing variables
var actor = "ryan%20reynolds";
var title = "summer%20catch";

// todo: set fetch functions, completed
//  Fetch Request to get Titles based off Actors Name
// var url = "https://actor-movie-api1.p.rapidapi.com/getid/" + actor + "?apiKey=62ffac58c57333a136053150eaa1b587";

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
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

// Fetch Request for Getting Streaming Services from Title of Movie

var fetchStreamingServices = async function (titleSearch) {
  // const url = "https://streaming-availability.p.rapidapi.com/v2/search/title?title=The%20Dark%20Knight&country=us&show_type=movie&output_language=en";
  const url = "https://streaming-availability.p.rapidapi.com/v2/search/title?title=" + encodeURI(title) + "&country=us&show_type=movie&output_language=en";
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
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

// todo: set event listeners
async function initSearch(searchEvent) {
	console.log('initSearch()');
	searchEvent.preventDefault();
	// first, get the value of the input text
	let searchString = inputEl.value.trim();
	// then, push it into the global array
	globalInputVal.push(searchString);
	console.log('globalInputVal:', globalInputVal);
   console.log('globalInputVal[0]:', globalInputVal[0]);
	// next, call the fetch function
	if (searchString) {
		await fetchActorMovies(actor); // todo: change to searchString
      await fetchStreamingServices(title); // todo: change to [nameOfString]
		if (globalResponse) {
			// displays results
			console.log('globalResponse:', globalResponse);
		}
	} else {
		alert('!searchString');
	}
   // then, set the local storage
   setLocalStorage();
}

// todo: set local storage
function setLocalStorage() {
	console.log('setLocalStorage()');
	// sets the current index to retrieve the text area value
   globalStorageEl[enumeratorValue] = document.createElement('span');
   globalStorageEl[enumeratorValue].textContent = globalInputVal[enumeratorValue];
   document.body.appendChild(globalStorageEl[enumeratorValue]);
   let localStorageTxtValue = JSON.stringify(globalInputVal[enumeratorValue]);
   console.log('localStorageTxtValue:', localStorageTxtValue);
   // sets the value from above into local storage
   localStorage.setItem(globalStorageEl, localStorageTxtValue);
   enumeratorValue++;
}

// todo: finish this method
function getLocalStorage() {
	console.log('getLocalStorage()');
	let conditionalValue = globalStorageEl.length;
   debugger;
	for (let i = 0; i < conditionalValue; i++) {
		globalStorageTxt[i] = localStorage.getItem(i);
		globalStorageEl[i].textContent = globalStorageTxt[i];
	}
}

// todo: call functions
window.addEventListener('load', function () {
	// todo: call functions inside lambda function
	formEl.addEventListener('submit', initSearch);
   // adds the carousel to the DOM
   bulmaCarousel.attach('#carousel-demo', {
      slidesToScroll: 1,
      slidesToShow: 1
  });
});


