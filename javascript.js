var yorkRegion = JSON.parse(localStorage.getItem("yorkRegion"));

if (yorkRegion === null) {
  yorkRegion = ["", "", "", "", "", "", "", "", ""];
}

for (var i = 0; i < 5; i++) {
  $('article').append('<div class="blueBox container jumbotron"> </div>')
}

searchHistory()

function searchHistory() {
$('aside').append('<p>Search for a City</p>')
$('aside').append('<div id="search-city" class="input-group mb-3"></div>')
$('#search-city').append('<input type="text" class="form-control" aria-describedby="button-addon2">')
$('#search-city').append('<div id="button" class="input-group-append"></div>')
$('#button').append('<button class="btn btn-primary" type="button" id="button-addon2">Button</button>');
  for (var i = 0; i < yorkRegion.length; i++) {
    $('aside').append('<button id="list" class="btn btn-light border border-secondary" href="#' + yorkRegion[i] + '">' + yorkRegion[i] + '</button>');
  }
  $('#button').click(function () {
    var newCity = $('input').val();
    currentConditions(newCity);
    fiveDayForecast(newCity);
  })
}

function currentConditions(newCity) {
  var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + ",ca&units=metric&appid=02c767f928e7e5ad4f0e01b6982bd3e6"

$.ajax({
    url: queryURLWeather,
    method: "GET"
  }).then(function(response) {
    console.log(response['main']['temp']);

    yorkRegion.unshift(newCity);
    yorkRegion.pop();
    var JSONReadyUsers = JSON.stringify(yorkRegion);
    localStorage.setItem("yorkRegion", JSONReadyUsers);
    $('aside').empty()
    searchHistory()
    var mainTemp = response['main']['temp'];

    $('#current-weather').append('<p>' + newCity + '</p>');
    $('#current-weather').append('<p>' + mainTemp.toFixed(2) + '°C</p>');

  }).catch(err => alert("Wrong city name!"));;

}

function fiveDayForecast(newCity) {
  var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + newCity + ",ca&units=metric&appid=02c767f928e7e5ad4f0e01b6982bd3e6"

  $.ajax({
    url: queryURLForecast,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
}

