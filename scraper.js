// const ora = require('ora') // spinner
const signale = require('signale')
const { argv } = require('yargs')
const scraper = require('./lib/scraper')
const nock = require('nock')
const yaml = require('js-yaml')
const fs = require('fs-extra')

const { target = '', debug } = argv

// nock('https://dummy.com').get('/').replyWithError('something awful happened')
nock('https://dummy.com').get('/').reply(401)

if (!target) {
  signale.fatal(Error('target argument is missing'))
} else {
  try {
    const instructions = yaml.safeLoad(fs.readFileSync('./instructions.yaml', 'utf8'))

    scraper({
      target,
      debug,
      ...instructions
    })
  } catch (err) {
    signale.fatal(
      Error(`Unable to read default instructions. Please provide an 'instructions.yaml' in the root directory.`)
    )
  }
}
