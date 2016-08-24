var symbol = process.argv[2]

var Portfolio = require("./Portfolio.js")
var RobinhoodStream = require("./RobinhoodStream.js")
var TickerFactory = require("./TickerFactory.js")

var robinhoodStream = new RobinhoodStream(['goog', 'gevo'])

var gevo = TickerFactory.getTickerForSymbol(robinhoodStream, "gevo")
var goog = TickerFactory.getTickerForSymbol(robinhoodStream, "goog")

var port = new Portfolio()
port.addTicker(gevo)
port.addTicker(goog)