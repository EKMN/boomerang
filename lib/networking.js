// use node-fetch
const fetch = require('node-fetch')
const ora = require('ora')
const signale = require('signale')

const getPage = async (args) => {
  const { target } = args

  if (!target) {
    return Promise.reject(new Error(`Target argument is missing`))
  }

  const spinner = ora(`Loading "${target}"`).start()

  try {
    const result = await fetch(target)

    const contentType = await result.headers.get('content-type')
    const isHTML = new RegExp(`text/html`)

    if (contentType && !isHTML.test(contentType)) {
      spinner.stop()
      return Promise.reject(
        Error(`Wrong content-type. Expected content-type to contain "text/html", received "${contentType}"`)
      )
    }

    const text = await result.text()

    spinner.stop()
    signale.success(`Loaded "${target}"`)

    return text
  } catch (err) {
    spinner.stop()
    return Promise.reject(Error(`Failed to fetch ${target}`))
  }
}

module.exports = {
  getPage
}
