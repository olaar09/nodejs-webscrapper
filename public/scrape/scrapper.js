'use strict'

var cheerio = require("cheerio");
var event = require('events');

module.exports = class Scrapper extends event.EventEmitter {

    constructor() { 
        super();
    }

    scrapeWorldBank(html, callBack) {
        let $ = cheerio.load(html);
        let scrapedData = [];
        let context = this;

        $('h5').each(function (i, elem) {
            let data = $(this);
            var chunk = "@World_bank:: title =>"+ data.children().first().text() + " =======link======== "+ data.children().first().attr('href');
            context.emit('scraped', chunk);
        })
    }

    scrapeUnicef(html, callBack) {
        let $ = cheerio.load(html);
        let context = this;

        $('.row').each(function(i, elem){
            let data = $(this);
            
            var chunk = "<p> @unicef ==title== " +data.children().first().text() + " ==link== "+ data.children().first().next().attr('href')+"</p>";
            context.emit('scraped', chunk);
        });

        $('.doc-text').each(function(elem, i){
            let data = $(this);

            var chunk = "@Unicef ==title== " +data.children().first().text()+ " ==link== "+ data.children().first().children().first().attr('href');
            context.emit('scraped', chunk);
        });
    }

    scrapeNces(html, callBack) {
       let $ = cheerio.load(html);
       let context = this;

       $('.post_title').each(function(elem, i){
           let data = $(this);

           let chunk = "@NCES ==title== " +data.children().first().text()+ " ==link== "+ data.children().first().attr('href');
           context.emit('scraped', chunk);
       });

       $('.caption_block').each(function(elem,i){
            let data =  $(this);

            let chunk = '@NCES ==title== ' + data.children().text() + " ==link==" + data.children().first().attr('href');
            context.emit('scraped', chunk);
       });
    }

    
}