const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const env = process.env.SPIKE_ENV

module.exports = {
  devtool: 'source-map',
  ignore: ['**/layout.html', '**/_*', '**/.*', 'readme.md', 'yarn.lock', 'package-lock.json'],
  matchers: { css: '*(**/)*.scss' },
  module: {
    rules: [{ test: /\.scss/, use: [{ loader: 'sass-loader' }] }]
  },
  reshape: htmlStandards({
    locals: (ctx) => { return { pageId: pageId(ctx), menu: [{ name: 'home', url: '/', active: 'index' }, { name: 'demo', active: 'demo' },{ name: 'api', active: 'api' }, { name: 'pricing', active: 'pricing' }, { name: 'contact', active: 'contact' }]   } },
    minify: env === 'production'
  }),
  postcss: cssStandards({
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards()
}
