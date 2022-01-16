const Config = require('markdown-it-chain');
const anchorPlugin = require('markdown-it-anchor');
const tocPlugin = require('markdown-it-table-of-contents');
const { slugify } = require('transliteration');
const containers = require('./containers');
const overWriteFenceRule = require('./fence');

const config = new Config();

config
  .options.html(true).end()

  // toc
  .plugin('toc')
    .use(tocPlugin, [{
      includeLevel: [2, 3],
      slugify,
    }])
    .end()

  // 锚点
  .plugin('anchor').use(anchorPlugin, [
    {
      level: 2,
      slugify,
      permalink: true,
      permalinkBefore: true,
    },
  ])
  .end()

  .plugin('containers')
  .use(containers)
  .end();

const md = config.toMd();
overWriteFenceRule(md);

module.exports = md;
