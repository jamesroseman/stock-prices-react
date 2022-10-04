import StockPrices, { StockPricesMultiple } from '../StockPrices';

describe('StockPrices', () => {
  let stockPrices: StockPrices;

  describe('getPricesMultiple', () => {
    const testPrices: object[] = [
      {AAPL: 19.7, MSFT: 35.93, AMZN: 20.23, date: "1/22/2014"},
      {AAPL: 19.61, MSFT: 36.17, AMZN: 20.35, date: "1/21/2014"},
      {MSFT: 36.38, AMZN: 19.98, date: "1/17/2014"},
      {AAPL: 19.79, MSFT: 36.89, AMZN: 19.79, date: "1/16/2014"},
      {AAPL: 19.91, AMZN: 19.79, date: "1/15/2014"},
      {AAPL: 19.51, MSFT: 35.78, AMZN: 19.88, date: "1/14/2014"}
    ];

    beforeEach(() => {
      stockPrices = new StockPrices(testPrices);
    });

    test('returns prices for one ticker without range', () => {
      const testTickers: string[] = ['AAPL'];
      const expectedPricesMultiple: StockPricesMultiple = {
        dates: ['1/14/2014', '1/15/2014', '1/16/2014', '1/21/2014', '1/22/2014'],
        prices: {
          'AAPL': [19.51, 19.91, 19.79, 19.61, 19.7],
        }
      };
      expect(stockPrices.getPricesMultiple(testTickers)).toEqual(expectedPricesMultiple);
    });

    test('returns multiple ticker prices without range', () => {
      const testTickers: string[] = ['AAPL', 'MSFT'];
      const expectedPricesMultiple: StockPricesMultiple = {
        dates: ['1/14/2014', '1/15/2014', '1/16/2014', '1/17/2014', '1/21/2014', '1/22/2014'],
        prices: {
          'AAPL': [19.51, 19.91, 19.79, null, 19.61, 19.7],
          'MSFT': [35.78, null, 36.89, 36.38, 36.17, 35.93],
        }
      };
      expect(stockPrices.getPricesMultiple(testTickers)).toEqual(expectedPricesMultiple);
    });

    test('returns prices for one ticker with range', () => {
      const testTickers: string[] = ['AAPL'];
      const startDate: string = '1/15/2014';
      const endDate: string = '1/20/2014';
      const expectedPricesMultiple: StockPricesMultiple = {
        dates: ['1/15/2014', '1/16/2014'],
        prices: {
          'AAPL': [19.91, 19.79],
        }
      };
      expect(stockPrices.getPricesMultiple(testTickers, startDate, endDate)).toEqual(expectedPricesMultiple);
    });

    test('returns multiple ticker prices with range', () => {
      const testTickers: string[] = ['AAPL', 'MSFT'];
      const startDate: string = '1/15/2014';
      const endDate: string = '1/20/2014';
      const expectedPricesMultiple: StockPricesMultiple = {
        dates: ['1/15/2014', '1/16/2014', '1/17/2014'],
        prices: {
          'AAPL': [19.91, 19.79, null],
          'MSFT': [null, 36.89, 36.38],
        }
      };
      expect(stockPrices.getPricesMultiple(testTickers, startDate, endDate)).toEqual(expectedPricesMultiple);
    });

    test('throws exception if specified ticker does not appear', () => {
      const testTickers: string[] = ['AAPL', 'MSFT', 'TWTR'];
      expect(() => stockPrices.getPricesMultiple(testTickers)).toThrow();
    });
  });
});