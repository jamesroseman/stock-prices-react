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

    test('returns only AAPL prices', () => {
      const testTickers: string[] = ['AAPL'];
      const expectedPricesMultiple: StockPricesMultiple = {
        dates: ['1/14/2014', '1/15/2014', '1/16/2014', '1/21/2014', '1/22/2014'],
        prices: {
          'AAPL': [19.51, 19.91, 19.79, 19.61, 19.7],
        }
      };
      expect(stockPrices.getPricesMultiple(testTickers)).toEqual(expectedPricesMultiple);
    });


  });
});