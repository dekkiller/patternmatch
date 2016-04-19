#!/usr/bin/env node

//  Pattern Matching Code Module
var transform = require('stream').Transform;
var util = require('util');
var program = require('commander');
var fileSystem = require('fs');

if(!transform) {
    transform  = require('readable-stream/transform')
};

function PatternMatch(pattern) { 
    transform.call(
    	this, 
    	{ 
    		objectMode: true 
    	});
    this.pattern = pattern
};

util.inherits(PatternMatch, transform);

PatternMatch.prototype._transform = function(chunk, encoding, done) { 
    var data = chunk.toString();
    this.push( '----------------INPUT----------------' ); 
    this.push( data ); 
    var parse = data.split(this.pattern)
    
    this._lastLineData = parse.splice( parse.length-1, 1)[0] 
    
    this.push('----------------OUTPUT----------------');
    for(var i in parse) {
		this.push(parse[i]) 
    }
      
};



PatternMatch.prototype._flush = function(flushCompleted) { 
	// Referenced from Strongloop
    if(this._lastLineData) this.push( this._lastLineData )
    this._lastLineData = null
    flushCompleted() 
};

// CL Args
program
    .option('-p, --pattern <pattern>', 'Input Patterns such as . ,') 
    .parse(process.argv)

// input stream
var inputStream = fileSystem.createReadStream('./input-sensor.txt'); 

// Pattern Matching stream
var patternStream = inputStream.pipe(new PatternMatch(program.pattern));

patternStream.on( 'readable', function() { 
    var line 
    while(null !== (line = this.read())){   
		console.log(line.toString())
    } 
});
