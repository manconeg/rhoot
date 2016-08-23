class Portfolio {
    print(ticker) {
        console.log(ticker.symbol + "\t" + ticker.value)
    }

    _buy(quantity, ticker) {
        var cashDifference = ticker.changeQuantityBy(quantity)
        this.cashValue += cashDifference
    }

    buy(quantity, ticker) {
        console.log("BUY")
        this._buy(quantity, ticker)
    }

    _sell(quantity, ticker) {
	     var cashDifference = ticker.changeQuantityBy(-1 * quantity)
       this.cashValue += cashDifference
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
        if(ticker.history[2] <= ticker.history[1] &&
          ticker.history[1] <= ticker.history[0]) {
            if(this.cashValue >= ticker.history[0]) {
                this.buy(Math.floor(this.cashValue / ticker.history[0]), ticker)
            }
            console.log("judging decent")
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
        this.recalculate()
    }

    recalculate() {
    	this.stockValue = 0

    	this.tickers.forEach((ticker) => {
		      this.stockValue += ticker.value
      })

      this.totalValue = this.cashValue + this.stockValue
      console.log("Cash: " + this.cashValue);
      console.log("Stock: " + this.stockValue);
      console.log("Total: " + this.totalValue);
    }

    kill() {
        clearInterval(this.interval)
    }
}

module.exports = Portfolio;
