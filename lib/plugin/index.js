const cheerio = require('cheerio');

const process = (data) => cheerio.load(data)('title').html().length;

const compare = ({ a, b }) => b - a;

module.exports = {
  run: (data) => {
    const result = {};
    result.a = process(data.a);
    result.b = process(data.b);
    if (result.a && result.b) {
      result.compare = compare(result);
    }
    return result;
  }
}
