var debug = require('debug')('ticker')
var EventEmitter = require('events').EventEmitter

module.exports = class Ticker extends EventEmitter {
    setNewPrice(newPrice) {
        newPrice = newPrice * 1
        
        if(newPrice != this.getLastPrice()) {
            debug(this.symbol + " " + newPrice)
            
            this.history.unshift(newPrice)
            this.history = this.history.slice(0, 10)
            this.initialized = true
            
            this.emit('priceUpdate')
        }
    }

    constructor(symbol) {
        super()
        this.quantity = 0
        this.history = []
        this.symbol = symbol
        this.initialized = false
    }

    getLastPrice() {
        return this.history[0]
    }
    
    getValue() {
        return this.quantity * this.getLastPrice()
    }

    changeQuantityBy(quantity) {
        var valueChange = quantity * this.getLastPrice()
        this.quantity += quantity
        
        return -1 * valueChange
    }
}