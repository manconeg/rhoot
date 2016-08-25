var symbol = process.argv[2]

var Portfolio = require("./lib/Portfolio.js")
var RobinhoodStream = require("./lib/RobinhoodStream.js")
var TickerFactory = require("./lib/TickerFactory.js")

var robinhoodStream = new RobinhoodStream(['goog', 'gevo'])

var gevo = TickerFactory.getTickerForSymbol(robinhoodStream, "gevo")
// var goog = TickerFactory.getTickerForSymbol(robinhoodStream, "goog")

var port = new Portfolio()
port.addTicker(gevo)
// port.addTicker(goog)