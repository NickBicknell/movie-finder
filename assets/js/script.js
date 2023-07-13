var carousels = bulmaCarousel.attach('.carousel', options);

for(var i = 0; i < carousels.length; i++) {
	// Add listener to  event
	carousels[i].on('before:show', state => {
		console.log(state);
	});
}

var element = document.querySelector('#carousel-demo');
if (element && element.bulmaCarousel) {
	// bulmaCarousel instance is available as element.bulmaCarousel
	element.bulmaCarousel.on('before-show', function(state) {
		console.log(state);
	});
}

next();

bulmaCarousel.attach('#carousel-demo', {
    slidesToScroll: 1,
    slidesToShow: 4
});

element.bulmaCarousel.on('show', function(bulmaCarouselInstance) {
    console.log(bulmaCarouselInstance.index);
});