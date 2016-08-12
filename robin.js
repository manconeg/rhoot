var Robinhood = require("robinhood");
require("timers");
var print = function(err, res, body) {console.log(body);};

var symbol = process.argv[2];

//var rh = Robinhood({"username": "***REMOVED***", "password": "***REMOVED***"}, function() {
//	rh.user(print);
//	rh.positions(print);
//	rh.accounts(print);
//	rh.investment_profile(print);
//});

var rh = Robinhood();
rh.quote_data(symbol, print);

class Ticker {
	
	judge() {
        if(this.history[2] < this.history[1]) {
            if(this.historyhis.history[1] < this.history[0]) {
				console.log("BUY")
			} else {
				// SELL
			}
		} else {
			// SELL
		}
	}

    handleQuoteResponse(error, response, body) {
		var lastPrice = body.results[0].last_trade_price
        this.history.unshift(lastPrice)
        this.history = this.history.slice(0, 3)
        console.log(this.history)
		if(this.history.length >= 3) {
			this.judge()
		}
		console.log(lastPrice)
	}
	
	constructor(symbol) {
        this.history = []
		this.symbol = symbol
		this.interval = setInterval(() => {
        	rh.quote_data(this.symbol, this.handleQuoteResponse.bind(this));
		}, 1000)
	}

	kill() {
		clearInterval(this.interval)
	}
}

var tick = new Ticker("goog");
