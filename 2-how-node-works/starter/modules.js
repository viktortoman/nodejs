//console.log(arguments);
//console.log('-----------------------------------');
//console.log(require("module").wrapper);

const Calculator = require('./test-module-1');
const calculator1 = new Calculator();

console.log(calculator1.add(3, 3));

const { add, multiply, divide } = require('./test-module-2');
console.log(multiply(3, 3));

require('./test-module-3')();


