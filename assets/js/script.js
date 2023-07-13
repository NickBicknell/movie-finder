// todo: set api keys
const firstKey = '';
const secondKey = '';
// sets global variables
let enumeratorValue = 0;
let globalResponse = [];
let globalInputVal = [];
let globalStorageEl = [];
let globalStorageVal = [];
let globalStorageTxt = [];

// todo: set variables with element references
let inputEl = document.querySelector('.input');
let formEl = document.getElementById('form-el');

// todo: set fetch functions

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
		await fetchActorMovies(searchString);
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

// test: this is a test function
async function fetchActorMovies(searchString) {
   console.log('fetchActorMovies()');
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
});
