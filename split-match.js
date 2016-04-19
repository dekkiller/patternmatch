#!/usr/bin/env node

//  Pattern Matching Code Module
var Transform = require('stream').Transform;
var util = require('util');
var program = require('commander');
var fs = require('fs');

if(!transform) {
    transform  = require('readable-stream/transform')
}

function PatternMatch(pattern) { 
    transform.call(
    	this, 
    	{ 
    		objectMode: true 
    	});
    this.pattern = pattern
}

util.inherits(PatternMatch, Transform);


