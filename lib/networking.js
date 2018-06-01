// use node-fetch
const fetch = require('node-fetch')
const ora = require('ora')
const signale = require('signale')

const statusCheck = ({ status }) => {
  if (!status || typeof status !== 'number') {
    return Promise.reject(new Error(`Invalid status`))
  }

  if (status >= 300 && status <= 550) {
    return Promise.reject(new Error(`Received an error status from target (HTTP ${status})`))
  }
}

const getPage = async (args) => {
  const { target } = args

  if (!target) {
    return Promise.reject(new Error(`Target argument is missing`))
  }

  const spinner = ora(`Loading "${target}"`).start()

  try {
    const result = await fetch(target)

    // check for HTTP-errors
    await statusCheck({ status: result.status })

    const contentType = await result.headers.get('content-type')
    const isHTML = new RegExp(`text/html`).test(contentType)

    if (!isHTML) {
      spinner.stop()
      return Promise.reject(
        Error(`Wrong content-type. Expected content-type to contain "text/html", received "${contentType}"`)
      )
    }

    // result.json() is also available
    const text = await result.textConverted()

    spinner.stop()
    signale.success(`Loaded "${target}"`)

    return text
  } catch (err) {
    spinner.stop()
    return Promise.reject(Error(`Failed to fetch ${target} \n    ${err.message}`))
  }
}

module.exports = {
  getPage
}
