'use strict'

var request = require('request');

module.exports = class grabber {

    constructor() { }

    grabData(source, callback) {
        request(source, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body)
            } else {
                console.log("an error occured @"+ source + "err"+ error);
            }
        })
    }

}