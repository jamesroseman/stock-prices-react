import React from 'react';
import { render, screen } from '@testing-library/react';
import StockPriceExplorer from './StockPriceExplorerComponent';

test('renders stock data header', () => {
  render(<StockPriceExplorer dates={[]} prices={{}} />);
  const stockDataElement = screen.getByText(/Stock Data/i);
  expect(stockDataElement).toBeInTheDocument();
})