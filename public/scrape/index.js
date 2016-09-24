var config = require('./config');
var grab = require('./grabber');
var sources = require('./sources');
var scrape = require('./scrapper');


module.exports = {
    config: config,
    grabber: grab,
    sources: sources,
    scrapper: scrape
}