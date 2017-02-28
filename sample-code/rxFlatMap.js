/**
 * created by waweru
 * @docs: sample for filter function in RxJS
 * */ 

'use strict';

const Rx = require('rx');

var logValue = function(val) { console.log(val) }; // logging function

// flattening an array that has sub-arrays <this is how flatMap works but for observables instead of arrays>
function concatAll(source) {
    return source.reduce(function(a, b) {
        return a.concat(b);
    });
}
logValue(concatAll([[0, 1, 2], [3, 4, 5], [6, 7, 8]]));

