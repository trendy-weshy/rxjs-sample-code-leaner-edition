/**
 * created by waweru
 * @docs: sample for filter function in RxJS
 * */ 

'use strict';

const Rx = require('rx');

var logValue = function(val) { console.log(val) }; // logging function

const factorial = (num) => {
    return Rx.Observable.range(1, num).reduce( (acc, elem) => (acc * elem) ).subscribe(logValue); 
}

factorial(120);

/**
 * note: 
 *  reduce is a powerful operator to manipulate a sequence. It is, in fact, the base 
 *  implementation for a whole subset of methods called aggregate operators. 
 **/

// other examples for reduce

logValue(`Find the average value`)
var avg = Rx.Observable.range(0, 5)
.reduce(function(prev, cur) {
    return {
        sum: prev.sum + cur,
        count: prev.count + 1
    };
}, { sum: 0, count: 0 }) // provide initial value in order to store the sum and total count of elem added
.map(function(o) {
    return o.sum / o.count;
});
var subscription = avg.subscribe(function(x) {
    console.log('Average is: ', x);
});

logValue(`scan func:- emits intermediate values without waiting for the aggregate`)
var avg = Rx.Observable.interval(1000)
.scan(function (prev, cur) {
    console.log(`current value is: ${cur}`);
    return {
        sum: prev.sum + cur,
        count: prev.count + 1
    };
}, { sum: 0, count: 0 })
.map(function(o) {
    return o.sum / o.count;
});
var subscription = avg.subscribe(function (x) {
    console.log(x);
});