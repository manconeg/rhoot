var Ticker = require("./Ticker.js")
var Rx = require('rx')

module.exports = class TickerFactory {}

module.exports.getTickerForSymbol = function(robinhoodStream, symbol) {
    symbol = symbol.toUpperCase()
    
    var ticker = new Ticker(symbol)
    Rx.Observable.fromEvent(
        robinhoodStream,
        'data').filter(quote => quote.symbol == symbol).subscribe(
        quote => ticker.setNewPrice(quote.ask_price),
        err => console.log(err),
        () => console.log('complete'))
    return ticker
}
