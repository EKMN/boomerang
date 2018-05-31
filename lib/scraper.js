// const jsdom = require('jsdom')
// const fetch = require('node-fetch')
const signale = require('signale') // logger

module.exports = (args) => {
  try {
    signale.success('Scraper started successfully')
  } catch (err) {
    signale.fatal(new Error('Scraper was unable to start'), err)
  }
  //
}
