import { StockPricesMap } from "../types/StockPricesMap";

export type StockPricesMultiple = {
  dates: string[];
  prices: StockPricesMap,
}

interface IStockPrices {
  getPricesMultiple: (tickers: string[], startDate?: string, endDate?: string) => StockPricesMultiple,
}

type StockPricesDateMap = {
  [ticker: string]: {
    [date: string]: number,
  }
};

class StockPrices implements IStockPrices {
  constructor(prices: any[]) {
    const sortedPrices = prices.sort(
      (priceA, priceB) => {
        const dateA: Date = new Date(priceA['date']);
        const dateB: Date = new Date(priceB['date']);
        return dateA > dateB ? 1 : -1;
      },
    );
    this.sortedPrices = sortedPrices;
  }

  private sortedPrices: any[] = [];

  getPricesMultiple(
    tickers: string[], 
    startDate?: string, 
    endDate?: string
  ): StockPricesMultiple {
    // Filter out any prices which don't include tickers we're searching for
    // todo: filter out by date range too 
    const filteredPrices = this.sortedPrices.filter((price: any) => {
      let shouldInclude: boolean = false;
      tickers.forEach((ticker: string) => {
        if (Object.prototype.hasOwnProperty.call(price, ticker)) {
          shouldInclude = true;
        }
      });
      return shouldInclude;
    });

    const dates: string[] = filteredPrices.map((price: any) => price['date']);
    const prices = filteredPrices.reduce(
      (map: StockPricesMap, price: any) => {
        tickers.forEach((ticker: string) => {
          // If the map doesn't have an entry for this ticker, add it
          if (!Object.prototype.hasOwnProperty.call(map, ticker)) {
            map[ticker] = [];
          }
          // If the price-date doesn't have this ticker included, add null
          // Otherwise, add the price.
          if (!Object.prototype.hasOwnProperty.call(price, ticker)) {
            map[ticker].push(null);
          } else {
            map[ticker].push(price[ticker]);
          }
        });
        return map;
      },
      {}
    );

    // If any of the tickers never appear, throw an exception.

    return {
      dates,
      prices,
    }
    }
}

export default StockPrices;