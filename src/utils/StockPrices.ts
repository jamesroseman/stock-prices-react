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
    // Filter out any prices which don't include tickers we're searching for or are out of range.
    const filteredPrices = this.sortedPrices.filter((price: any) => {
      // If the date of the price is outside our range, we shouldn't include it.
      if (startDate !== undefined || endDate !== undefined) {
        const date: string = price['date'];
        const dateObj: Date = new Date(date);
        if (startDate !== undefined) {
          const startDateObj: Date = new Date(startDate);
          if (dateObj < startDateObj) {
            return false;
          }
        }
        if (endDate !== undefined) {
          const endDateObj: Date = new Date(endDate);
          if (dateObj > endDateObj) {
            return false;
          }
        }
      }
    
      // Check all tickers to see if any are included in this price.
      let shouldIncludeByTicker: boolean = false;
      tickers.forEach((ticker: string) => {
        if (Object.prototype.hasOwnProperty.call(price, ticker)) {
          shouldIncludeByTicker = true;
        }
      });
      return shouldIncludeByTicker;
    });

    // Get the list of dates in the filtered prices.
    const dates: string[] = filteredPrices.map((price: any) => price['date']);
    
    // Get the list of prices by combining different price-dates.
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
    tickers.forEach((ticker: string) => {
      const nonNullPrices = prices[ticker].filter((value) => value !== null);
      if (nonNullPrices.length === 0) {
        throw new Error(`Ticker "${ticker}" was not found in any prices being returned.`)
      }
    });

    return {
      dates,
      prices,
    }
  }
}

export default StockPrices;