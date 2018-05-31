// const jsdom = require('jsdom')
// const fetch = require('node-fetch')
const signale = require('signale')
const { getPage } = require('./networking')
const createDOM = require('./domreader')
const prettyjson = require('prettyjson')

module.exports = async (args) => {
  const { target, instructions, saveOnSuccess, debug } = args

  if (!instructions) {
    signale.fatal(new Error(`Please provide instructions`))
    return
  }

  try {
    signale.success('Started successfully')

    const page = await getPage({ target })

    const results = createDOM({
      html: page,
      instructions
    })

    signale.success(`Fetched data using ${results.length} instruction${results.length >= 2 && 's'}`)

    if (saveOnSuccess) {
      // save file
    }

    if (debug) {
      // print output
      console.log(prettyjson.render(results))
    } else {
      // print a summary
    }
  } catch (err) {
    signale.fatal(Error(err.message))
  }
}
