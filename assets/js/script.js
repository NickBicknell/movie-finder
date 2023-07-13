// todo: set api keys
const firstKey = '';
const secondKey = '';
// sets global variables
let globalResponse = [];
let globalInputVal = [];
let globalStorageEl = [];
let globalStorageVal = [];
let globalStorageTxt = [];

// todo: set variables with element references
let inputEl = document.querySelector('.input');

// todo: set fetch functions

// todo: set event listeners
async function initSearch(searchEvent) {
	console.log('initSearch()');
   debugger;
	searchEvent.preventDefault();
	// first, get the value of the input text
	let searchString = inputEl.value.trim();
	// then, push it into the global array
	globalInputVal.push(searchString);
	console.log('globalInputVal:', globalInputVal);
   debugger;
	// next, call the fetch function
	if (searchString) {
		await fetchActorMovies(searchString);
		if (globalResponse) {
			// displays results
			console.log('globalResponse:', globalResponse);
		}
	} else {
		alert('!searchString');
	}
}

// test: this is a test function
async function fetchActorMovies(searchString) {
   console.log('fetchActorMovies()');
   debugger;
}

// todo: set local storage
function setLocalStorage() {
	console.log('setLocalStorage()');
	let conditionalValue = globalStorageEl.length;
   debugger;
	for (let i = 0; i < conditionalValue; i++) {
		// sets an event listener to the search button
		globalStorageEl[i].addEventListener('click', function () {
			// sets the current index to retrieve the text area value
			let localStorageTxtValue = globalStorageTxt.value;
			console.log('localStorageTxtValue:', localStorageTxtValue);
			// sets the value from above into local storage
			localStorage.setItem(globalStorageEl, localStorageTxtValue);
		});
	}
}

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
document.addEventListener('load', function () {
	// todo: call functions inside lambda function
	setLocalStorage();
});
