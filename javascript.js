var yorkRegion = ["Georgina", "East Gwillimbury", "King", "Vaughan", "Whitechurch Stouville", "Markham"];

$('aside').append('<p>Search for a City</p>')
$('aside').append('<div class="input-group mb-3"><input type="text" class="form-control" aria-describedby="button-addon2"><div class="input-group-append"><button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button></div></div>')
for (var i = 0; i < yorkRegion.length; i++) {
    $('aside').append('<button class="btn btn-light border border-secondary" href="#' + yorkRegion[i] + '">' + yorkRegion[i] + '</button>');
}
