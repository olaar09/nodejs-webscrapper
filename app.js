'use strict'
var express = require('express');
var fs = require('fs');
var event = require('events');





//custom modules
var mModule = require('./public/scrape');
var grabber = new mModule.grabber();
var scrape = new mModule.scrapper();
var config = JSON.parse(fs.readFileSync("./public/scrape/config.json"));


var app = express();
var port = process.env.PORT || 3000;
var scrappedWorldBank = false;
var scrappedNces = false;
var scrappedUnicef = false;


var checkStatus = function (pointer) {
    switch(pointer){
        case 0:  scrappedWorldBank = true;
                 break;
        case 1: scrappedUnicef = true;
                break;
        case 2: scrappedNces = true;
    }
  
   if(scrappedWorldBank== true && scrappedNces == true && scrappedUnicef == true){
       scrape.emit('scrape-finished');
       scrappedWorldBank = scrappedNces = scrappedUnicef = false;
   }
}

app.get('/', function (req, res) {
    let responseData = "";

    scrape.on('scraped', function (chunk) {
        responseData = responseData + chunk;
    });

    Object.keys(config.sources).forEach(function (v, i) {

        var source = config.sources[v];
        var pointer = i;

        grabber.grabData(source, function (body) {

            console.log("<h5> Finished grabbing  from source @ " + source+"</h5>");

            switch (pointer) {
                case 0: scrape.scrapeWorldBank(body, checkStatus(pointer));
                    break;
                case 1: scrape.scrapeUnicef(body, checkStatus(pointer));
                    break;
                case 2: scrape.scrapeNces(body, checkStatus(pointer));
                    break;
                //case 3: scrape.scrapeGov_edu(body);
            }
            return;
        });
        return;
    });

    scrape.on('scrape-finished', function (chunk) {
        responseData = responseData + chunk;
        res.end(responseData);
    });

}).listen(port);



