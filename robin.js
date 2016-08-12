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

class Portfolio {
    print(ticker) {
        console.log(ticker.symbol + "\t" + ticker.value)
    }
    
    _buy(quantity, ticker) {
        ticker.quantity += quantity
        ticker.value += quantity * ticker.history[0]
        this.cashValue -= quantity * ticker.history[0]
        this.stockValue += quantity * ticker.history[0]
        
        this.print(ticker)
        this.recalculate()
    }
    
    buy(quantity, ticker) {
        console.log("BUY")
        this._buy(quantity, ticker)
    }
    
    _sell(quantity, ticker) {
        ticker.quantity -= quantity
        ticker.value -= quantity * ticker.history[0]
        this.cashValue += quantity * ticker.history[0]
        this.stockValue -= quantity * ticker.history[0]
        
        this.print(ticker)
        this.recalculate()
    }
    
    sell(quantity, ticker) {
        console.log("SELL")
        _sell(quantity, ticker)
    }
    
    dump(ticker) {
        console.log("DUMP")
        this._sell(ticker.quantity, ticker)
    }

    judge(ticker) {
        if(ticker.history[2] < ticker.history[1] &&
           ticker.history[1] < ticker.history[0]) {
            if(this.cash >= ticker.history[0]) {
                this.buy(Math.floor(this.cash / ticker.history[0]), ticker)
            }
        } else {
            this.dump(ticker)
        }
    }
    
    constructor() {
        this.tickers = []
        this.portfolio = {}
        this.cashValue = 100
        this.totalValue = 0;
        this.stockValue = 0;
        this.interval = setInterval(this.updateTickers.bind(this), 1000)
    }
    
    addTicker(ticker) {
        this.tickers.push(ticker)
    }
    
    updateTickers() {
        this.tickers.forEach((ticker) => {
            ticker.update(() => {
                if(ticker.history.length >= 3) {
                    this.judge(ticker)
                }
            })
        })
    }
    
    recalculate() {
        this.totalValue = this.cashValue + this.stockValue
        console.log("Total Value: " + this.totalValue);
    }
    
    kill() {
        clearInterval(this.interval)
    }
}

class Ticker {
    handleQuoteResponse(body) {
		var lastPrice = body.results[0].last_trade_price
        this.history.unshift(lastPrice)
        this.history = this.history.slice(0, 3)
        console.log(this.history)
		console.log(lastPrice)
	}
	
	constructor(symbol) {
        this.quantity = 0
        this.value = 0
        this.history = []
		this.symbol = symbol
    }
	
    update(callback) {
        rh.quote_data(this.symbol, (error, response, body) => {
            this.handleQuoteResponse(body)
            callback()
        });
    }
}

var tick = new Ticker("goog");
var port = new Portfolio();
port.addTicker(tick)
