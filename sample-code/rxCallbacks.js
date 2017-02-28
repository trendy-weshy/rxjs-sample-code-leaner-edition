/**
 * created by waweru
 * @docs: sample callbacks with rxjs
 * */ 

'use strict';

const Rx = require('rx');
const fs = require('fs');

let readdir = Rx.Observable.fromNodeCallback(fs.readdir); // Observable
let source = readdir('/home/john/sample-code/');
var subscription = source.subscribe(
    function(res) { console.log(`List of directories: ${ res }\n`); },
    function(err) { console.log(`Error: ${ err }`); },
    function() { console.log('Done!'); 
});

