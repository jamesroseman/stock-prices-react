import React from 'react';
import StockPriceExplorer from './components/StockPriceExplorerComponent';

function App() {
  return (
    <div className="App">
      <StockPriceExplorer
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
  );
}

export default App;
