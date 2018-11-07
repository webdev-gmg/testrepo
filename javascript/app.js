$(document).foundation();
var imageBaseUrl = 'https://image.tmdb.org/t/p/';
$(document).ready(function () {
	//var apiBaseURL = 'https://api.themoviedb.org/3/movie/335983/videos?api_key='
	var apiBaseURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=';
	var apiTmdbkey = 'cf9588340d8a721412af021d7fc6ba6a';
	var imageBaseUrl = 'https://image.tmdb.org/t/p/';

	//swap 600 for ImageURL
	//var imageURL = 'https://api.themoviedb.org/3/movie/600/images?api_key=cf9588340d8a721412af021d7fc6ba6a';
	var youTubeLink = 'https://api.themoviedb.org/3/movie/335983/videos?api_key=cf9588340d8a721412af021d7fc6ba6a';

	var tmdbURL = apiBaseURL + apiTmdbkey;
	//console.log(tmdbURL);

	var settings = {
		"url": apiBaseURL + apiTmdbkey,
		"method": "GET",
	}

	$.ajax(settings).done(function (response) {
		//	console.log(response);
		//	console.log(response.results[0].overview);
		//var overview = response.results[0].overview;

		for (i = 0; i < response.results.length; i++) {

			document.getElementById('movie-grid').innerHTML += '<a data-toggle="exampleModal9"><img src="' + imageBaseUrl + 'w300' + response.results[i].poster_path + '" id = "' + response.results[i].id + '" onclick = "reveal(this.id)">';




		}
	});


});

var clickedId;

function reveal(clickedId) {

	var settings = {
		"url": "https://api.themoviedb.org/3/movie/" + clickedId + "?api_key=cf9588340d8a721412af021d7fc6ba6a",
		"method": "GET",
	}

	$.ajax(settings).done(function (response) {
		console.log(response);
		//alert(response.overview);
		var overview = response.overview;
		document.getElementById('exampleModal9').innerHTML = '<div class="row"> <div class="cell small-4 large-4 columns"><img src="' + imageBaseUrl + 'w300' + response.poster_path + '"><div class="cell small-4 large-4 columns">' + overview + '</div></div><button id =' + clickedId + ' class="close-button" data-close aria-label="Close reveal" type="button"><span aria-hidden="true">&times</span></button><a href="#" data-reveal-id="videoModal" id =' + clickedId + ' class="radius button" onclick = "youTubeReveal(this.id)">Watch Trailer&hellip;</a><input type = "text"><script>$(document).foundation();</script>';

	});
}
//Playing the trailer
function youTubeReveal(clickedId) {

	var settings = {
		"url": "https://api.themoviedb.org/3/movie/" + clickedId + "/videos?api_key=cf9588340d8a721412af021d7fc6ba6a",
		"method": "GET",
	}
	var exampleModal8 = document.getElementById(clickedId).value;
	$.ajax(settings).done(function (response) {
		//console.log(response);
		//alert(response.resultskey);
		document.getElementById('exampleModal9').innerHTML = '<iframe width="553" height="280" src="https://www.youtube.com/embed/' + response.results[0].key + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><button id =' + clickedId + ' class="close-button" data-close aria-label="Close reveal" type="button"><span aria-hidden="true">&times</span></button>';



	});
}

//Display the searched Movie

$("#movieSearchBtn").on('click', function (event) {

	var query = $("#searchMovie").val().trim();
	event.preventDefault();
	$("#movie-grid").empty();
	var settings = {
		"url": "https://api.themoviedb.org/3/search/movie?api_key=cf9588340d8a721412af021d7fc6ba6a&language=en-US&page=1&include_adult=false&query=" + query + '"',
		"method": "GET"
	}

	$.ajax(settings).done(function (response) {
		//console.log(response);
		for (i = 0; i < response.results.length; i++) {

			$("#movie-grid").append('<a data-toggle="exampleModal9"><img src="' + imageBaseUrl + 'w300' + response.results[i].poster_path + '" id = "' + response.results[i].id + '" onclick = "reveal(this.id)">');

		}

	});
});
//Genre
$(".genre").on('click', function (event) {
	event.preventDefault();
	var genre = this.id;
	$("#movie-grid").empty();
	var settings = {

		"url": "https://api.themoviedb.org/3/discover/movie?api_key=cf9588340d8a721412af021d7fc6ba6a&with_genres=" + genre,
		"method": "GET"
	}

	$.ajax(settings).done(function (response) {
		for (i = 0; i < response.results.length; i++) {

			$("#movie-grid").append('<a data-toggle="exampleModal9"><img src="' + imageBaseUrl + 'w300' + response.results[i].poster_path + '" id = "' + response.results[i].id + '" onclick = "reveal(this.id)">');

		}
	});
})

//http://api.fandango.com/v1/?op=theatersbypostalcodesearch&postalcode=94105&apikey=&sig=7e56dd10e7d394376ac564563086c205a21071f5adda61c8e419a9cd3c2b53b3
//Fandango
$("#zipCode").on('click', function (event) {
	event.preventDefault();

	console.log('Getting here');
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "http://data.tmsapi.com/v1.1/movies/showings?startDate=2018-11-07&zip=78501&api_key=gvfz63zjy3q4pk92hdhxeekg",
		"method": "GET"
	}

	$.ajax(settings).done(function (response) {
		console.log('Fandango:' + response[0].showtimes[0].theatre.name);
		console.log('Fandango:' + response[0].showtimes[0].dateTime);
		console.log('Fandango:' + response[0].showtimes[1].theatre.name);
		console.log('Fandango:' + response[0].showtimes[1].dateTime);
	});


	 })





	$(document).foundation();


	window.onload = function () {
		stickyFooter();

		//you can either uncomment and allow the setInterval to auto correct the footer
		//or call stickyFooter() if you have major DOM changes
		//setInterval(checkForDOMChange, 1000);
	};

	//check for changes to the DOM
	function checkForDOMChange() {
		stickyFooter();
	}

	//check for resize event if not IE 9 or greater
	window.onresize = function () {
		stickyFooter();
	}

	//lets get the marginTop for the <footer>
	function getCSS(element, property) {

		var elem = document.getElementsByTagName(element)[0];
		var css = null;

		if (elem.currentStyle) {
			css = elem.currentStyle[property];

		} else if (window.getComputedStyle) {
			css = document.defaultView.getComputedStyle(elem, null).
				getPropertyValue(property);
		}

		return css;

	}

	function stickyFooter() {

		if (document.getElementsByTagName("footer")[0].getAttribute("style") != null) {
			document.getElementsByTagName("footer")[0].removeAttribute("style");
		}

		if (window.innerHeight != document.body.offsetHeight) {
			var offset = window.innerHeight - document.body.offsetHeight;
			var current = getCSS("footer", "margin-top");

			if (isNaN(current) == true) {
				document.getElementsByTagName("footer")[0].setAttribute("style", "margin-top:0px;");
				current = 0;
			} else {
				current = parseInt(current);
			}

			if (current + offset > parseInt(getCSS("footer", "margin-top"))) {
				document.getElementsByTagName("footer")[0].setAttribute("style", "margin-top:" + (current + offset) + "px;");
			}
		}
	}

/*
! end sticky footer
*/
