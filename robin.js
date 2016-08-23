var Robinhood = require("robinhood")
require("timers")
var print = function(err, res, body) {console.log(body)}

var symbol = process.argv[2]

//var rh = Robinhood({"username": "***REMOVED***", "password": "***REMOVED***"}, function() {
//	rh.user(print);
//	rh.positions(print);
//	rh.accounts(print);
//	rh.investment_profile(print);
//});


var Portfolio = require("./Portfolio.js")

var Ticker = require("./Ticker.js")











var rh = new Robinhood()
var EventEmitter = require('events').EventEmitter;
var RobinhoodStream = class RobinhoodStream extends EventEmitter {
  stop() {
    clearInterval(this.interval)
  }

  start() {
    this.interval = setInterval(this._getQuote.bind(this), 5000)
  }

  _getQuote() {
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

  constructor(symbols) {
    super()
    this.symbolsString = typeof symbols === "object" ? symbols.join(',') : symbols
  }
}


var Rx = require('Rx')
var rhs = new RobinhoodStream(['goog', 'gevo'])
rhs.start()


Rx.Observable.fromEvent(
  rhs,
  'data')
  .subscribe(
    function (quote) {
      console.log('symbol: ' + quote.symbol)
    },
    function (err) {
      console.log('Error: ' + err)
    },
    function () {
      console.log('Completed')
    })



//
// var tickerUpdater = new TickerUpdater()
// var tick = new Ticker("gevo")
// var port = new Portfolio(rh)
// port.addTicker(tick)
