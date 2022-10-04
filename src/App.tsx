import React from 'react';
import StockPriceExplorer from './components/StockPriceExplorerComponent';
import { StockPricesMap } from './types/StockPricesMap';

function App() {
  const dates: string[] = [
    "10/3/2022",
    "10/4/2022",
    "9/30/2022",
    "9/29/2022",
    "9/28/2022",
    "9/27/2022",
    "9/26/2022",
    "9/23/2022",
    "9/22/2022",
  ];

  const prices: StockPricesMap = {
    "AMZN": [
      119.89, 113.58, null, 115.60, null, 117.20, 113.30, 116, 117.08,
    ],
    "AAPL": [
      145.03, 138.21, 141.28, 146.1, null, 152.74, 149.66, 151.19, 152.38,
    ],
    "TSLA": [
      250.52, 254.50, 266.15, 282.76, 283.08, 283.84, 271.83, null, 299.86,
    ],
    "META": [
      140.49, 137.14, 136.05, 139.36, 134.62, null, 140.12, 141.42, 141.55,
    ],
    "NFLX": [
      244.84, null, null, 241.61, 229.69, 228.63, 225.60, 235.14, 235.35,
    ]
  }

  return (
    <div className="App">
      <StockPriceExplorer dates={dates} prices={prices} />
    </div>
  );
}

export default App;
