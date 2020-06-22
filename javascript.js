var yorkRegion = JSON.parse(localStorage.getItem("yorkRegion"));
var firstTime = false;

if (yorkRegion === null) {
  yorkRegion = ["", "", "", "", "", "", "", "", ""];
}

searchHistory()
currentConditions(yorkRegion[0]);
fiveDayForecast(yorkRegion[0]);

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
  var cityName = newCity;
$.ajax({
    url: queryURLWeather,
    method: "GET"
  }).then(function(response) {
    console.log(response['main']['temp']);

    for (var i = 0; i < yorkRegion.length; i++) {
      if (yorkRegion[i] === newCity) {
        yorkRegion.unshift(cityName);
        yorkRegion.splice( i + 1 , 1 )
        firstTime = false;
      }
    }

    if (firstTime) {
      cityName = response['name'];
      console.log(cityName)
      yorkRegion.unshift(cityName);
      yorkRegion.pop();
      var JSONReadyUsers = JSON.stringify(yorkRegion);
      localStorage.setItem("yorkRegion", JSONReadyUsers);
    }
    firstTime = true;
    $('aside, #current-weather, #forecast').empty()
    searchHistory()
    var mainTemp = response['main']['temp'];
    var mainHumi = response['main']['humidity'];
    var weatherIcon = response['weather'][0]['icon'];
    var windSpeed = response['wind']['speed'];
    var longAtt = response['coord']['lon'];
    var latAtt = response['coord']['lat'];
    
    $('#current-weather').append('<h1 id="icon-here">' + cityName + " (" + (moment().format('MMMM Do, YYYY')) + ')</h1>');
    $('#icon-here').append('<img src="http://openweathermap.org/img/w/' + weatherIcon + '.png" alt="weather icon">');
    $('#current-weather').append('<p> Temperature: ' + mainTemp + '°C</p>');
    $('#current-weather').append('<p> Humidity: ' + mainHumi + '%</p>');
    $('#current-weather').append('<p> Wind Speed: ' + windSpeed + ' MPH</p>');

    var UVURLWeather = "http://api.openweathermap.org/data/2.5/uvi?appid=02c767f928e7e5ad4f0e01b6982bd3e6&lat=" + latAtt + "&lon=" + longAtt
    
    $.ajax({
      url: UVURLWeather,
      method: "GET"
    }).then(function(getUV) {
        var uvIndex = getUV['value']
        $('#current-weather').append('<p> UV Index: <mark>' + uvIndex + '</mark></p>');
    })

  }).catch(err => alert("Wrong city name!"));;
}

function fiveDayForecast(newCity) {
  var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + newCity + ",ca&units=metric&appid=02c767f928e7e5ad4f0e01b6982bd3e6"

  $.ajax({
    url: queryURLForecast,
    method: "GET"
  }).then(function(response) {

    for (var i = 0; i < 5; i++) {
      $('article').append('<div id="blue-' + i + '" class="blueBox"> </div>')
    }

    for (var i = 0; i < 5; i ++) {
      var weatherIcon = response['list'][i * 8]['weather'][0]['icon'];
      $('#blue-' + i).append('<p>' + (moment().add( i + 1, 'days').format('MMMM Do, YYYY')) + '</p>')
      $('#blue-' + i).append('<img src="http://openweathermap.org/img/w/' + weatherIcon + '.png" alt="weather icon">');
      $('#blue-' + i).append('<p>Temp: ' + response['list'][i * 8]['main']['temp'] + '°C</p>')
      $('#blue-' + i).append('<p>Humidity: ' + response['list'][i * 8]['main']['humidity'] + '%</p>')
    }
  });
}

