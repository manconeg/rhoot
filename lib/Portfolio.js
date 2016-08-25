var debug = require('debug')('portfolio')
var Rx = require('rx')

module.exports = class Portfolio {
    _buy(quantity, ticker) {
        var cashDifference = ticker.changeQuantityBy(quantity)
        this.cashValue += cashDifference
    }

    buy(quantity, ticker) {
        debug("BUY")
        this._buy(quantity, ticker)
    }

    _sell(quantity, ticker) {
        var cashDifference = ticker.changeQuantityBy(quantity > 0 ? -1 * quantity : quantity)
        this.cashValue += cashDifference
    }

    sell(quantity, ticker) {
        debug("SELL")
        _sell(quantity, ticker)
    }

    dump(ticker) {
        debug("DUMP")
        this._sell(ticker.quantity, ticker)
    }

    judge(ticker) {
        if(!ticker.initialized || !ticker.quantity) return
        
        if(ticker.history[2] <= ticker.history[1] &&
          ticker.history[1] <= ticker.history[0]) {
            if(this.cashValue >= ticker.history[0]) {
                debug("judging decent")
                this.buy(Math.floor(this.cashValue / ticker.history[0]), ticker)
            }
        } else {
            this.dump(ticker)
        }
        this._recalculate()
    }

    constructor() {
        this.tickers = []
        this.portfolio = {}
        this.cashValue = 100
        this.totalValue = 0;
        this.stockValue = 0;
    }

    addTicker(ticker) {
        this.tickers.push(ticker)
        
        Rx.Observable.fromEvent(
            ticker,
            'priceUpdate').subscribe(
                () => this.judge(ticker),
                err => debug(err),
                () => debug('complete'))
    }

    _recalculate() {
        this.stockValue = 0

    	this.tickers.forEach((ticker) => {
            if(ticker.initialized) {
                this.stockValue += ticker.getValue()
            }
        })
        
        this.totalValue = this.cashValue + this.stockValue
        debug("Cash: " + this.cashValue);
        debug("Stock: " + this.stockValue);
        debug("Total: " + this.totalValue);
    }
}
