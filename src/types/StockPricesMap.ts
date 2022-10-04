/**
 * A mapping from stock price tickers to an array of 
 * prices.
 * 
 * e.g. AAPL: [19.72, 18.58, null, 31.38]
 */
 export type StockPricesMap = {
  [ticker: string]: (number|null)[];
}