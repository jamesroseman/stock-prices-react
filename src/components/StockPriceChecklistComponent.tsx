import React, { useState } from 'react';
import StockPriceChecklistItem, { StockPriceChecklistItemProps } from './StockPriceChecklistItemComponent';
import './StockPriceChecklistComponent.css';

type TickerSelectionMap = {
  [ticker: string]: boolean;
}

export type StockPriceChecklistProps = {
  tickers: string[];
  onTickerSelection?: (ticker: string) => any;
}

function StockPriceChecklist({
  tickers,
  onTickerSelection = () => {},
}: StockPriceChecklistProps) {
  const [tickerMap, setTickerMap] = useState<TickerSelectionMap>({});

  // Deduplicate the tickers.
  const dedupedTickers: string[] = Array.from(new Set(tickers));

  // Alphaetize the tickers.
  const alphabetizedTickers: string[] = dedupedTickers.sort((a, b) => a.localeCompare(b));
  
  // Transform the tickers into ticker checklist items.
  const checklistItems = alphabetizedTickers.map((ticker: string) => {
    const onClickFn = () => {
      setTickerMap({ ...tickerMap, [ticker]: !(tickerMap[ticker] ?? false)});
      onTickerSelection(ticker);
    };
    return (
      <StockPriceChecklistItem 
        key={`checklist-item-${ticker}`}
        ticker={ticker} 
        isChecked={tickerMap[ticker] ?? false}
        onClick={onClickFn}
      />
    );
  });

  return <div className="checklist-container">{checklistItems}</div>;
}

export default StockPriceChecklist;