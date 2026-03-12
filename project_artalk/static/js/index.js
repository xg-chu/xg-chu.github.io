window.HELP_IMPROVE_VIDEOJS = false;

// var INTERP_BASE_0 = ;
// var NUM_INTERP_FRAMES = 12;

var interp_images = [];
function preloadInterpolationImages(INTERP_BASE, NUM_INTERP_FRAMES) {
  interp_images.push([]);
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i) + '.jpg';
    interp_images[interp_images.length-1][i] = new Image();
    interp_images[interp_images.length-1][i].src = path;
  }
}

function setInterpolationImage(wrapper_id, stack_id, i) {
  var image = interp_images[stack_id][i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper-'+wrapper_id).empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages("./static/images/stacked0", 12);
    preloadInterpolationImages("./static/images/stacked1", 12);
    preloadInterpolationImages("./static/images/stacked2", 12);
    preloadInterpolationImages("./static/images/stacked3", 12);
    preloadInterpolationImages("./static/images/stacked4", 12);
    preloadInterpolationImages("./static/images/stacked5", 12);
    preloadInterpolationImages("./static/images/stacked6", 12);
    preloadInterpolationImages("./static/images/stacked7", 12);
    preloadInterpolationImages("./static/images/stacked8", 19);
    preloadInterpolationImages("./static/images/stacked9", 19);
    preloadInterpolationImages("./static/images/stacked10", 19);
    preloadInterpolationImages("./static/images/stacked11", 19);

    $('#interpolation-slider-0').on('input', function(event) {
      setInterpolationImage('0', 0, this.value);
    });
    setInterpolationImage('0', 0, 0);
    $('#interpolation-slider-0').prop('max', 11);

    $('#interpolation-slider-1').on('input', function(event) {
      setInterpolationImage('1', 1, this.value);
    });
    setInterpolationImage('1', 1, 0);
    $('#interpolation-slider-1').prop('max', 11);

    $('#interpolation-slider-2').on('input', function(event) {
      setInterpolationImage('2', 2, this.value);
    });
    setInterpolationImage('2', 2, 0);
    $('#interpolation-slider-2').prop('max', 11);

    $('#interpolation-slider-3').on('input', function(event) {
      setInterpolationImage('3', 3, this.value);
    });
    setInterpolationImage('3', 3, 0);
    $('#interpolation-slider-3').prop('max', 11);

    $('#interpolation-slider-4').on('input', function(event) {
      setInterpolationImage('4', 4, this.value);
    });
    setInterpolationImage('4', 4, 0);
    $('#interpolation-slider-4').prop('max', 11);

    $('#interpolation-slider-5').on('input', function(event) {
      setInterpolationImage('5', 5, this.value);
    });
    setInterpolationImage('5', 5, 0);
    $('#interpolation-slider-5').prop('max', 11);

    $('#interpolation-slider-6').on('input', function(event) {
      setInterpolationImage('6', 6, this.value);
    });
    setInterpolationImage('6', 6, 0);
    $('#interpolation-slider-6').prop('max', 11);

    $('#interpolation-slider-7').on('input', function(event) {
      setInterpolationImage('7', 7, this.value);
    });
    setInterpolationImage('7', 7, 0);
    $('#interpolation-slider-7').prop('max', 11);

    $('#interpolation-slider-8').on('input', function(event) {
      setInterpolationImage('8', 8, this.value);
    });
    setInterpolationImage('8', 8, 9);
    $('#interpolation-slider-8').prop('max', 18);

    $('#interpolation-slider-9').on('input', function(event) {
      setInterpolationImage('9', 9, this.value);
    });
    setInterpolationImage('9', 9, 9);
    $('#interpolation-slider-9').prop('max', 18);

    $('#interpolation-slider-10').on('input', function(event) {
      setInterpolationImage('10', 10, this.value);
    });
    setInterpolationImage('10', 10, 9);
    $('#interpolation-slider-10').prop('max', 18);

    $('#interpolation-slider-11').on('input', function(event) {
      setInterpolationImage('11', 11, this.value);
    });
    setInterpolationImage('11', 11, 9);
    $('#interpolation-slider-11').prop('max', 18);



    bulmaSlider.attach();

})
