/**
 * created by waweru
 * @docs: sample for map function in RxJS
 * */ 

'use strict';

const Rx = require('rx');

var logValue = function(val) { console.log(val) }; // logging function

logValue(`Using Native map`);
// normal map function
var src = [1, 2, 3, 4, 5];
var upper = src.map(function(name) {
    return name * 2;
});
upper.forEach(logValue); // log new set of values

logValue(`Using Observables`);
// use Observables and mapping functions
var src = Rx.Observable.range(1, 5);
var upper = src.map(function(name) {
    return name * 2;
});
upper.subscribe(logValue); // log new set of values

/**
 * note: Cannot be used for async operations and computations. Please use flatMap
 * */ 