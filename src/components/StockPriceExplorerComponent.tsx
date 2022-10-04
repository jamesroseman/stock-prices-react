import React, { useState } from 'react';
import { StockPricesMap } from '../types/StockPricesMap';
import StockPriceChecklist from './StockPriceChecklistComponent';
import './StockPriceExplorerComponent.css';
import StockPriceTable from './StockPriceTableComponent';

export type StockPriceExplorerProps = {
  dates: string[],
  prices: StockPricesMap,
}

function StockPriceExplorer({
  dates,
  prices
}: StockPriceExplorerProps) {
  const tickers: string[] = Object.keys(prices);
  const [currPricesMap, setCurrPricesMap] = useState<StockPricesMap>({});

  // When a stock price is selected in the checklist, update the prices state.
  const onTickerSelectionFn = (ticker: string) => {
    if (Object.prototype.hasOwnProperty.call(currPricesMap, ticker)) {
      // If the ticker exists in state, it should be removed.
      delete currPricesMap[ticker];
      setCurrPricesMap({ ...currPricesMap });
    } else {
      // If the ticker does not exist in state, it should be added.
      setCurrPricesMap({
        ...currPricesMap,
        [ticker]: prices[ticker],
      });
    }
  }

  return (
    <div className="explorer-container">
      <div className="explorer-header">Stock Data</div>
      <div className="explorer-body">
        <div className="explorer-checklist">
          <StockPriceChecklist tickers={tickers} onTickerSelection={onTickerSelectionFn} />
        </div>
        <div className="explorer-data">
          {
            Object.keys(currPricesMap).length === 0
            ? <div className="explorer-data-empty-msg">Please select at least one ticker.</div>
            : <StockPriceTable dates={dates} prices={currPricesMap} />
          }
        </div>
      </div>
      
    </div>
  )
}

export default StockPriceExplorer;