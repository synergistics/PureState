var state = require("./purestate");

var x = state(1); // uncomputed state
var y = state(() => x() + 1); // computed state
var z = state(() => [x(), y(), x()+y()]); // computed state of a computed state

console.log(x());
console.log(y());
console.log(z());

// Those above output "1", "2", "[1, 2, 3]"

x(10); // sets x to 10

console.log(x());
console.log(y());
console.log(z());

// Now those above output "10", "20", "[10, 20, 30]"


