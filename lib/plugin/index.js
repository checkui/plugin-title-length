const cheerio = require('cheerio');

const plugin = {};

plugin.process = (data) => {
  if (!data || typeof data !== 'string') return false;

  const $ = cheerio.load(data);
  if (!$) return false;

  const $title = $('title');
  if (!$title) return false;

  const titleHtml = $title.html();
  if (!titleHtml) return false;

  const titleLength = titleHtml.length;
  if (
    (!titleLength && titleLength !== 0) ||
    titleLength > 1000
  ) return false;

  return titleLength || false;
};

plugin.compare = ({ a, b }) => b - a;

plugin.run = ({ a, b }) => {
  const result = {};
  if (a) result.a = plugin.process(a);
  if (b) result.b = plugin.process(b);
  if (result.a && result.b) result.compare = plugin.compare(result);
  return result;
};

module.exports = plugin;
