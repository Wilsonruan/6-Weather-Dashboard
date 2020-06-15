var provincial = ["Austin", "Chicago", "New York", "Orlando", "San Francisco", "Seattle", "Denver", "Atlanta"];

for (var i = 0; i < 8; i++) {
    $('aside').append('<button class="btn btn-light border border-secondary" href="#' + provincial[i] + '">' + provincial[i] + '</button>');
}
