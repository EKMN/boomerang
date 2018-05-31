// const ora = require('ora') // spinner
const signale = require('signale')
const argv = require('yargs').argv
const scraper = require('./lib/scraper')

const { target = '', debug } = argv

// read instructions from a yaml file as a default

if (!target) {
  signale.fatal(Error('target argument is missing'))
} else {
  scraper({
    target,
    debug,
    saveOnSuccess: true,
    instructions: [
      { instruction: 'Get a specific value', selector: '#readme > article > div:nth-child(6)' },
      { instruction: 'Get all paragraphs', selector: 'p' },
      { instruction: 'Get all spans', selector: 'span' },
      { instruction: `Get all headings`, selector: 'h1, h2, h2, h3, h4, h5, h6' }
    ]
  })
}
