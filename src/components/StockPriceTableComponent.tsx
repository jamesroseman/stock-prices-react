import React from 'react';
import { StockPricesMap } from '../types/StockPricesMap';
import './StockPriceTableComponent.css';

export type StockPriceTableProps = {
  dates: string[],
  prices: StockPricesMap,
}

function StockPriceTable({
  dates,
  prices,
}: StockPriceTableProps) {
  // Create a list of alphabetized tickers, for rendering.
  const tickers: string[] = Object.keys(prices);
  const alphabetizedTickers: string[] = tickers.sort((a, b) => a.localeCompare(b));

  // Create a row for the headers, determined from the dates and tickers.
  const staticHeaders = [
    <td key="stock-price-table-date-header">Date</td>
  ];
  const tickerHeaders = alphabetizedTickers.map((ticker: string) => {
    return (
      <td key={`stock-price-table-header-${ticker}`}>{ticker}</td>
    );
  });
  const headers = <tr>{[...staticHeaders, ...tickerHeaders]}</tr>;

  // Create rows for each date with price information for each ticker.
  const rows = dates.map((date: string, index: number) => {
    const dateCell = <td className="table-date-td">{date}</td>;
    const priceCells = alphabetizedTickers.map((ticker: string) => {
      const datePrice: number | null = prices[ticker][index];
      return (
        <td key={`stock-price-table-cell-${date}${ticker}`} className="table-price-td">{datePrice}</td>
      );
    });

    // todo: logic here for if none of the tickers have price data for this date?

    return <tr>{[dateCell, ...priceCells]}</tr>
  });

  return (
    <div className="table-container">
      <table>
        <thead>{headers}</thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default StockPriceTable;