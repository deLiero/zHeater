var zHeater = {};

//= calc/calc.js
//= form/form.js


var calc = new zHeater.Calc({D: 300, H: 900, Tk: 3, gap: 1.2});
var form = new zHeater.Form();

console.log(calc.calculate());