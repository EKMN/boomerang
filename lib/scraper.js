// const jsdom = require('jsdom')
// const fetch = require('node-fetch')
const signale = require('signale')
const { getPage } = require('./networking')
const scrapeDOM = require('./domreader')
const prettyjson = require('prettyjson')
const hash = require('keccak')
const fs = require('fs-extra')

const processUrl = ({ url }) => {
  return url.split('/')[2]
}

module.exports = async (args) => {
  const { target, instructions, saveOnSuccess, debug, output } = args

  if (!instructions) {
    signale.fatal(new Error(`Please provide instructions`))
    return
  }

  try {
    signale.success('Started successfully')

    const page = await getPage({ target })

    const results = scrapeDOM({
      html: page,
      instructions
    })

    signale.success(`Fetched data using ${results.length} instruction${results.length >= 2 && 's'}`)

    if (saveOnSuccess) {
      try {
        const contentHash = hash('keccak256').update(JSON.stringify(results)).digest('hex')
        const filename = `${output}/${processUrl({ url: target })}_${contentHash}.json`

        await fs.outputJson(filename, results)

        signale.success(`Saved results into ${filename}`)
      } catch (err) {
        signale.fatal(Error(`Unable to save results\n    ${err.message}`))
      }
    }

    if (debug) {
      console.log(prettyjson.render(results))
    } else {
      // print a summary
    }
  } catch (err) {
    signale.fatal(Error(err.message))
  }
}
