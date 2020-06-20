var yorkRegion = ["Georgina", "East Gwillimbury", "King", "Vaughan", "Whitechurch Stouville", "Markham", "Toronto"];

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + yorkRegion[6] + ",ca&appid=02c767f928e7e5ad4f0e01b6982bd3e6"

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });

$('aside').append('<p>Search for a City</p>')
$('aside').append('<div id="search-city" class="input-group mb-3"></div>')
$('#search-city').append('<input type="text" class="form-control" aria-describedby="button-addon2">')
$('#search-city').append('<div id="button" class="input-group-append"></div>')
$('#button').append('<button class="btn btn-primary" type="button" id="button-addon2">Button</button>');

for (var i = 0; i < yorkRegion.length; i++) {
    $('aside').append('<button class="btn btn-light border border-secondary" href="#' + yorkRegion[i] + '">' + yorkRegion[i] + '</button>');
}
for (var i = 0; i < 5; i++) {
$('article').append('<div class="blueBox container jumbotron"> </div>')
}

$('#button').click(function () {
  console.log("It works")
})