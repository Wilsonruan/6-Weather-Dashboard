var yorkRegion = JSON.parse(localStorage.getItem("yorkRegion"));
var firstTime = false;

if (yorkRegion === null) {
  yorkRegion = ["Toronto", "Markham", "Scarborough", "Richmond Hill", "Newmarket", "North York", "Vaughan", "Barrie", "Ottawa"];
}

myFunction()
currentConditions(yorkRegion[0]);
geolocation()

function myFunction() {
$('aside').append('<p>Search for a City</p>')
$('aside').append('<div id="search-city" class="input-group mb-3"></div>')
$('#search-city').append('<input type="text" class="form-control" aria-describedby="button-addon2">')
$('#search-city').append('<div id="button" class="input-group-append"></div>')
$('#button').append('<button class="btn btn-primary" type="button" id="button-addon2"><i class="fa fa-search"></button>');
$('aside').append('<div id="list" class="d-flex flex-column"> </div>')
  // for (var i = 0; i < yorkRegion.length; i++) {
  //   $('#list').append('<button class="btn btn-light border border-secondary" value="' + yorkRegion[i] + '">' + yorkRegion[i] + '</button>');
  // }
  yorkRegion.forEach(element => {
    $('#list').append('<button class="btn btn-light border border-secondary" value="' + element + '">' + element + '</button>');
  });

  $('#button').click(function () {
    var newCity = $('input').val();
    currentConditions(newCity);
  })
  $('.btn-light').click(function () {
    var newCity = $(this).val();
    currentConditions(newCity);
  })
}

function currentConditions(newCity) {
  var queryURLWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + newCity + ",ca&units=metric&appid=02c767f928e7e5ad4f0e01b6982bd3e6"
$.ajax({
    url: queryURLWeather,
    method: "GET"
  }).then(function(response) {
    newCity = newCity.trim().toLowerCase()
    newCity = newCity.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    searchHistory(newCity);
    fiveDayForecast(newCity);
    myFunction();
    var mainTemp = response['main']['temp'];
    var mainHumi = response['main']['humidity'];
    var weatherIcon = response['weather'][0]['icon'];
    weatherIcon = "http://openweathermap.org/img/w/" + weatherIcon + ".png"
    var windSpeed = response['wind']['speed'];
    var longAtt = response['coord']['lon'];
    var latAtt = response['coord']['lat'];

    var mainCity = $('<h1>').attr('id','icon-here').text(newCity + " (" + (moment().format('MMMM Do, YYYY')) + ")")
    weatherIcon = $('<img>').attr('src', weatherIcon).attr('alt','weather icon')
    mainTemp = $('<p>').text('Temperature: ' + mainTemp + '°C')
    mainHumi = $('<p>').text('Humidity: ' + mainHumi + '%')
    windSpeed = $('<p>').text('Wind Speed: ' + windSpeed + ' MPH')

    $('#current-weather').append(mainCity, mainTemp, mainHumi, windSpeed);
    $('#icon-here').append(weatherIcon);

    uvIndex(longAtt, latAtt)

  }).catch(err => alert("Please enter a correct city name in Canada"));;
}

function uvIndex (longAtt, latAtt) {
  var UVURLWeather = "http://api.openweathermap.org/data/2.5/uvi?appid=02c767f928e7e5ad4f0e01b6982bd3e6&lat=" + latAtt + "&lon=" + longAtt
    
  $.ajax({
    url: UVURLWeather,
    method: "GET"
  }).then(function(getUV) {
      var uvIndex = getUV['value']
      $('#current-weather').append('<p> UV Index: <mark>' + uvIndex + '</mark></p>');
  })
}

function fiveDayForecast(newCity) {
  var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + newCity + ",ca&units=metric&appid=02c767f928e7e5ad4f0e01b6982bd3e6"

  $.ajax({
    url: queryURLForecast,
    method: "GET"
  }).then(function(response) {

    for (var i = 0; i < 5; i ++) {
      var blueCubes = $('<div>').attr('id','blue-' + i).addClass('blueBox rounded');
      $('article').append(blueCubes);

      var weatherIcon = response['list'][i * 8]['weather'][0]['icon'];
      weatherIcon = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
      var tempForcast = response['list'][i * 8]['main']['temp'];
      var humidityForcast = response['list'][i * 8]['main']['humidity'];

      var datesForcast = $('<p>').text(moment().add( i + 1, 'days').format('MMMM Do, YYYY'))
      // weatherIcon = $('<img>').attr('src', weatherIcon).attr('alt', 'weather icon')
      weatherIcon = $('<img>').attr({src: weatherIcon, alt: 'weather icon'})
      tempForcast = $('<p>').text('Temp: ' + tempForcast + '°C')
      humidityForcast = $('<p>').text('Humidity: ' + humidityForcast + '%')

      $('#blue-' + i).append(datesForcast, weatherIcon, tempForcast, humidityForcast);
    }
  });
}

function searchHistory (newCity) {
  for (var i = 0; i < yorkRegion.length; i++) {
    if (yorkRegion[i] == newCity) {
      yorkRegion.unshift(newCity);
      yorkRegion.splice( i + 1 , 1 )
      firstTime = false;
    }
  }
  if (firstTime) {
    yorkRegion.unshift(newCity);
    yorkRegion.pop();
  }
  var JSONReadyUsers = JSON.stringify(yorkRegion);
  localStorage.setItem("yorkRegion", JSONReadyUsers);
  firstTime = true;
  $('aside, #current-weather, #forecast').empty()
}

function geolocation () {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    var crd = pos.coords;
    var yourLocation = "http://api.openweathermap.org/data/2.5/weather?lat=" + crd.latitude + "&lon=" + crd.longitude + "&appid=02c767f928e7e5ad4f0e01b6982bd3e6"
    $.ajax({
      url: yourLocation,
      method: "GET"
    }).then(function(response) {
      $('strong').text(response['name'])

    })

  }
  function error(err) {
    $('strong').text('Not Available')
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);
}