## PureState.js

PureState is the simplest implementation of a sane state-dealing library that works.

The idea is simple. You should write your program as if every value was pure, without ever having to think about, or deal with state directly, like you need to in flux-derived libraries. "Pure" values can change in response to events, and this causes every value that depend on it to be updated doing the minimal amount of work possible. And that is all. That is powerful enough to deal with every use cases of complex libraries around today, while being much cleaner, simpler, performant and well-behaved.

```javascript
var state = require("./purestate");

// Stateful variables are just JS values wrapped with a `state` call
var x = state(0);

// This reads a stateful variable; read as "console.log(x)"
console.log(x());

// This writes a stateful variable; read as "x = 1"
x(1);

// Stateful values can depend on other stateful values 
var y = state(() => x() + 1);
var z = state(() => [x(), y(), x()+y()]);

console.log(x());
console.log(y());
console.log(z());

// Those above output "1", "2", "[1, 2, 3]"

// If you change a stateful value, all values that depend on it are updated.

x(10); // sets x to 10

console.log(x());
console.log(y());
console.log(z());

// Now those above output "10", "20", "[10, 20, 30]"
```

See `example_counter.html` and `example_todo.html` for a quick example of how that is powerful enough to express interactive web applications in a pure and very simple way. That is just to show the concept - of course those examples could be much better with, for example, VirtualDOM or React instead of strings for rendering.

### The rant

After so many years, seems like the public is finally learning to appreciate the benefits of purity and immutability. The evolution from the times of jQuery, through Angular, to React, show it. React nails the issue of rendering views, but it still has issues with state. The initial proposal of Flux had clear weakenesses and the market slowly gravitated torwards better solutions.

FRP-inspired answers such as Redux are the hot thing now. I think those are the wrong approach. Folds ("reducers") are merely simulating state through the continuous application of a function to a list-like structure. The fact it is pure under the hoods doesn't make your state less stateful. It just makes it more awkward. Your giant reducer function is no better than just mutating variables on your heap, and zipping streams is just a fancy way to combine variables. Except now you have a reversible history. It is overengineering for no real benefit.

In my understanding, the solution to state is simple: stop fighting it. State is not bad - what is bad is the century-old practice to use state where it is not needed. As long as you do it right - i.e., keep 99% of your application pure, identify the minimal amount of data that needs to be mutated and only alter it - then it is perfectly healthy to treat state as a first-class citiszien.
