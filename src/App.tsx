import React from 'react';
import StockPriceExplorer from './components/StockPriceExplorerComponent';

function App() {
  return (
    <div className="App">
      <StockPriceExplorer
        dates={[]}
        prices={{}}
      />
    </div>
  );
}

export default App;
