const fs = require('fs-extra')
const signale = require('signale')
const scraper = require('./lib/scraper')
const nock = require('nock')
const yaml = require('js-yaml')
const { argv } = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('--target', 'Scrapes the targeted website')
  .example('$0 --target https://google.com/', 'Scrapes Google for content')
  .demandOption([ 'target' ])
  .describe('config', 'Config file path')
  .describe('output', `Custom output folder path. Default: '/scrapes`)
  .describe('target', 'Target website URL')
  .describe('debug', 'Output debug statement')
  .alias('c', 'config')
  .alias('o', 'output')
  .alias('t', 'target')
  .alias('d', 'debug')
  .alias('h', 'help')
  .alias('v', 'version')

const { target = '', debug = false, config = './config.yaml', output = './scrapes' } = argv

nock('https://dummy.com').get('/').reply(401)

if (!target) {
  signale.fatal(Error('target argument is missing'))
} else {
  try {
    const configContents = yaml.safeLoad(fs.readFileSync(config, 'utf8'))

    scraper({
      output,
      target,
      debug,
      ...configContents
    })
  } catch (err) {
    signale.fatal(Error(`Unable to read default config. Please provide a 'config.yaml' in the root directory.`))
  }
}
