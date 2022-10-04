import React from 'react';
import { render, screen } from '@testing-library/react';
import StockPriceExplorer from './StockPriceExplorerComponent';

test('renders init message', () => {
  render(<StockPriceExplorer />);
  const helloWorldElement = screen.getByText(/Hello, world!/i);
  expect(helloWorldElement).toBeInTheDocument();
})