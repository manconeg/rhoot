//module.exports = class PortfolioLogic {}
//
//module.exports.judge = function(portfolio, ticker) {
//    if(!ticker.initialized) return
//
//    if(ticker.history[2] <= ticker.history[1] &&
//       ticker.history[1] <= ticker.history[0]) {
//        if(this.cashValue >= ticker.history[0]) {
//            this.buy(Math.floor(this.cashValue / ticker.history[0]), ticker)
//        }
//        console.log("judging decent")
//    } else {
//        this.dump(ticker)
//    }
//    this._recalculate()
//}