var Robinhood = require("robinhood")
var rh = new Robinhood()
var EventEmitter = require('events').EventEmitter

module.exports = class RobinhoodStream extends EventEmitter {
    stop() {
        clearInterval(this.interval)
    }

    _start() {
        this._getQuote()
        this.interval = setInterval(this._getQuote.bind(this), 2500)
    }

    _getQuote() {
        if(this.symbolsString) {
            rh.quote_data(this.symbolsString, (error, response, body) => {
                if(error) {
                    this.emit('error', error)
                } else {
                    body.results.forEach((ticker) => {
                        this.emit('data', ticker)
                    })
                }
            })
        }
    }

    constructor(symbols) {
        super()
        this.setSymbols(symbols)
        this._start()
    }
    
    setSymbols(symbols) {
        this.symbolsString = typeof symbols === "object" ? symbols.join(',') : symbols
    }
    
    login() {
        var rh = Robinhood({"username": "***REMOVED***", "password": "***REMOVED***"}, function() {
            this.emit('authenticated')
        })
    }
}