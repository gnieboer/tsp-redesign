$(document).ready(function() {

setupSlider('sliderAge', 'age', 20, 80, 1, 30);

setupSlider('sliderRetire', 'retire', 20, 100, 1, 65);

setupSlider('sliderSalary', 'salary', 10000, 150000, 5000, 50000);

reDraw();

});

// initial slider setup

function setupSlider(slider, input, min, max, step, value) {

$( '#'+slider ).slider({

range: "min",

// value: 30,

min: min,

max: max,

step: step,

slide: function( event, ui ) {

// console.log(ui.value);

// clearMyInterval();

// mapIndex(ui.value);

// dropChange();

if (slider == 'sliderRetire') {

if (ui.value < $('#age').val()) {

// value = $('#age').val();

return false;

}

}

$('#'+input).val(ui.value);

$('#'+input).trigger('change');

},

stop: function( event, ui ) {

if (slider == 'sliderAge') {

if (ui.value > $('#retire').val()) {

$('#retire').val(ui.value);

$('#sliderRetire').slider('value', ui.value);

// $('#sliderRetire').slider('refresh');

}

}

}

});

$( '#'+input ).numeric({ negative : false, decimal: false });

$( '#'+input ).change(function() {

setSlider(slider, input, min, max);

return false;

});

$( '#'+input ).blur(function() {

setSlider(slider, input, min, max);

return false;

});

$( '#'+input ).keyup(function(event) {

if (event.keyCode === 13) {

setSlider(slider, input, min, max);

}

});

$('#'+input).val(value);

$('#'+input).trigger('change');

}

// handle an input box change

function setSlider(slider, input, min, max) {

var value = $('#'+input).val();

if (value < min) value = min;

if (value > max) value = max;

// if (slider == 'sliderRetire') {

// if (value < $('#age').val()) value = $('#age').val();

// }

$('#' + slider).slider('value', value);

// $('#' + slider).slider('refresh');

$('#'+input).val(value);

}

/* CurrencyFormatted was delivered in paycheckEstimator.js */

function CurrencyFormatted(num, no_cent) {

if(isNaN(num)) { num = "0"; }

num = num.toString().replace(/\$|\,/g,'');

if(isNaN(num)) { num = "0"; }

sign = (num == (num = Math.abs(num)));

num = Math.floor(num*100+0.50000000001);

cents = num%100;

num = Math.floor(num/100).toString();

if(cents<10) {

cents = "0" + cents;

}

for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++) {

num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));

}

if (no_cent != null && no_cent == 'no_cent') {

return (((sign)?'':'-') + '$' + num);

} else {

return (((sign)?'':'-') + '$' + num + '.' + cents);

}

}
