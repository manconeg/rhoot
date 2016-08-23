class Ticker {
  setNewPrice(newPrice) {
    this.history.unshift(newPrice)
    this.history = this.history.slice(0, 10)
  }

  constructor(symbol) {
    this.quantity = 0
    this.history = []
    this.symbol = symbol
  }

  getLastPrice() {
    return this.history[0]
  }

  changeQuantityBy(quantity) {
  	var valueChange = quantity * this.getLastPrice()
  	this.value += valueChange
  	this.quantity += quantity

  	return -1 * valueChange
  }
}

module.exports = Ticker;
