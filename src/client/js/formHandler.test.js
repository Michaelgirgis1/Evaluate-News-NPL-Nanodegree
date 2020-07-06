
import { checkUrl } from "./formHandler";
const { TestScheduler } = require('jest');


//test to see if the checkUrl function runs as expected
describe('Check Url', () => {
  test('It should check for a valid url via the passed argument (url)', () => {
      const input = 'https://news.yahoo.com/much-u-dials-back-july-044708025.html'
      const output = true;
      expect(checkUrl(input)).toEqual(output)
  })
})

//test to see if the checkUrl function runs as expected
describe('Check Url', () => {
  test('It should check for a valid url via the passed argument (url)', () => {
      const input = 'https://www.abc.com'
      const output = true;
      expect(checkUrl(input)).toEqual(output)
  })
})