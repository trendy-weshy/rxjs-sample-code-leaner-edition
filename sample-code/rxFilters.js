/**
 * created by waweru
 * @docs: sample for filter function in RxJS
 * */ 

'use strict';

const Rx = require('rx');

var logValue = function(val) { console.log(val) }; // logging function
var isEven = val => (val % 2 !== 0); // is even test function

logValue(`using native filter function`);
// native filter function
var src = [1, 2, 3, 4, 5];
var even = src.filter(isEven);
even.forEach(logValue);

logValue(`using observable flter function`)
// Rxjs filter function for Observables
var src = Rx.Observable.range(1, 5);
var even = src.filter(isEven);
even.subscribe(logValue);