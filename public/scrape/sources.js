
'use strict'

module.exports = class sources {

    constructor() {
        this.sources = [];
    }

    setSources(sources) {
        this.sources = sources;
    }

    getSources() {
        return this.sources;
    }
}