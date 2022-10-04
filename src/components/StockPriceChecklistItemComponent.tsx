import React from 'react';
import './StockPriceChecklistItemComponent.css';

export type StockPriceChecklistItemProps = {
  ticker: string;
  isChecked?: boolean;
  onClick?: () => any;
}

function StockPriceChecklistItem({
  ticker,
  isChecked = false,
  onClick,
}: StockPriceChecklistItemProps) {
  return (
    <div className="checklist-item-container" onClick={onClick}>
      <div className="checklist-item-checkbox">
        <input type="checkbox" checked={isChecked} />
      </div>
      <div className={isChecked ? "checklist-item-ticker-ticked" : "checklist-item-ticker-unticked"}>
        {ticker}
      </div>
    </div>
    
  )
}

export default StockPriceChecklistItem;