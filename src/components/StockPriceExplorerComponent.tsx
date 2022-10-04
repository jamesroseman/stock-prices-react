import React from 'react';
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
        <div className="explorer-data">
          <StockPriceTable 
            dates={[
              "1/17/2014",
              "1/21/2014",
              "1/22/2014"
            ]} 
            prices={{
              'AAPL': [19.31, 19.61, 19.7],
              'MSFT': [36.38, null, 35.93],
              'AMZN': [null,  null, null],
            }} 
          />
        </div>
      </div>
      
    </div>
  )
}

export default StockPriceExplorer;