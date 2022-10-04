import React from 'react';
import StockPriceChecklist from './StockPriceChecklistComponent';
import './StockPriceExplorerComponent.css';

/**
 * A mapping from stock price tickers to an array of 
 * prices.
 * 
 * e.g. AAPL: [19.72, 18.58, null, 31.38]
 */
export type StockPricesMap = {
  [ticker: string]: (number|null)[];
}

export type StockPriceExplorerProps = {
  dates: string[],
  prices: StockPricesMap,
}

function StockPriceExplorer({
  dates,
  prices
}: StockPriceExplorerProps) {
  return (
    <div className="explorer-container">
      <div className="explorer-header">Stock Data</div>
      <div className="explorer-body">
        <div className="explorer-checklist">
          <StockPriceChecklist 
            tickers={['AAPL', 'META', 'GOOGL', 'AMZN', 'AMZN', 'AMZN', 'TWTR']} 
            onTickerSelection={console.log}
          />
        </div>
        <div className="explorer-data">DATE  |  AAPL  |</div>
      </div>
      
    </div>
  )
}

export default StockPriceExplorer;