// ============= MODULES / REQUIRES ============ //
// Load the fs package to read and write
var fs = require("fs");

// Load the NPM Package inquirer
var inquirer = require("inquirer");

// Load the NPM Package request
var request = require("request");

// Load the NPM Package chalk
var chalk = require('chalk');

// Load the fs package to read and write
var fs = require("fs");

// Load NPM pkg for Twitter
var Twitter = require('twitter');

// Load NPM pkg for Spotify
var Spotify = require('node-spotify-api');

// 
const https = require("https");

// Load the NPM Package for dotenv
const donenv = require("dotenv").config();

// Require keys file
const keys = require("./keys"); 

// ================================== //


// ============= VARIABLES ============ //

// Variable Key for Spotify 
var spotify = new Spotify(keys.spotify);

// Variable Key for Twitter   
var client = new Twitter(keys.twitter);

// Create an empty string for holding song
var songName = "";

// Create an empty string for holding song
var movieName = "";

// Save for log
var saveLog = ""; 

// Action user tells the bot to do 
var action = process.argv[2];

// What the user is searching through the action
var value = process.argv[3];



// ================================== //


// ============== SWITCHES ================= //

switch (action) {
	case "movie-this":
	movieSearch(value);
	break;

	case "tweet-this":
	tweet();
	break;

	case "song-this":
	song();
	break;

	case "randomz-this":
	randomz();
	break;

	// case "joke-time":
	// joke();
	// break;
}

// ================================== //


// ============== FUNCTIONS ================= //


// ------- OMDB -------- // 

// Loop though all of the words in the node argument
function movieSearch (){
	for (var i = 3; i < process.argv.length; i++){
		
		//if the movie title has more than one word 
		//it will run it through here and add some spaces
		if (i > 3 && i < process.argv.length) {
			movieName = movieName + "+" + process.argv[i];
		}

		//single word searches
		else {
			movieName += process.argv[i];
		}
	}

	//run request to OMDB API with movie 
	var queryUrl= "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function (error, response, body){
		// If the response is successfull
		if (!error && response.StatusCode === 200){
		}

		console.log("-------------------------------------------");
		console.log("----------- Here is your Movie ------------");

       // Title of the movie.
       console.log("Title: " + JSON.parse(body).Title);
       // Year the movie came out.
       console.log("Year: " + JSON.parse(body).Year);
       // IMDB Rating of the movie.
       console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
       // Rotten Tomatoes Rating of the movie.
       console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
       // Country where the movie was produced.
       console.log("County: " + JSON.parse(body).Country);
       // Language of the movie.
       console.log("Language: " + JSON.parse(body).Language);
       // Plot of the movie.
       console.log("Plot: " + JSON.parse(body).Plot);
       // Actors in the movie.
       console.log("Actors: " + JSON.parse(body).Actors);

       console.log("--------------------<3---------------------");
       console.log("-------------------------------------------");


   })
	//append func that stores val to log.txt
	addCmds();
};


// ------- Twitter -------- // 

function tweet() {
	var params = { screen_name: 'bernburnss'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for(var i = 0; i < 3; i++){
				console.log("-------------------------------------------");
				console.log(tweets[i].text)
				console.log("-------------------------------------------");
			}
		}
	});

	//append func that stores val to log.txt
	addCmds();
};

// ------- Spotify -------- // 
function song (){
	for (var i = 3; i < process.argv.length; i++){
		
		//if the song title has more than one word 
		//it will run it through here and add some spaces
		if (i > 3 && i < process.argv.length) {
			songName = songName + "+" + process.argv[i];
		}

		//single word searches
		else {
			songName += process.argv[i];
		}
	}

	spotify.search({ type: 'track', query: songName }, function(err, data) {
		if (err) {

			console.log("Sorry, I am not sure what you are looking for can be found");
			console.log("Try this instead!")

			console.log("-------------------------------------------");
			// Artist 
			console.log("Artist: Glen Campbell"); 
			// Song
			console.log("Song: Rhinestone Cowboy"); 
			// Link to spotify song
			console.log("Link: https://api.spotify.com/v1/tracks/0VwTeYNjcl30DyQlt3GPe0"); 
			// Album
			console.log("Album: Rhinestone Cowboy (Expanded Edition)"); 
			console.log("-------------------------------------------");

		}

		else{
			console.log("-------------------------------------------");
			// Artist 
			console.log("Artist: " + data.tracks.items[0].artists[0].name); 
			// Song
			console.log("Song: " + data.tracks.items[0].name); 
			// Link to spotify song
			console.log("Link: " + data.tracks.items[0].href); 
			// Album
			console.log("Album: " + data.tracks.items[0].album.name); 
			console.log("-------------------------------------------");
		}
	});

	//append func that stores val to log.txt
	addCmds();
};








// ------- Random -------- // 

function randomz() {};

// * `do-what-it-says`
	// Use fs node package and liri  will tkae the text from inside random.txt and then use it to call on of LIRI's commands
	// It should run "spotify-this-song" for "I Want it That Way"



// ------- Joke -------- // 

function joke() {
	//returns a number between 1 and 4 
	Math.floor(Math.random()*5); 
	fs.readFile("joke.txt", "utf8", function (err, data){
		if (err) {
			return console.log("I cannot read the file. I wish I could have joke")
		}
	})


};


//Func to write history into a text document 
function addCmds() {
	fs.appendFile("log.txt", ", " + saveLog, function(err){
		if (err) {
			return console.log("I am sorry, but I cant log this.");
		}
	});
};



