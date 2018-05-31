const fs = require('fs-extra')
const signale = require('signale')

module.exports = async ({ filePath }) => {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch (err) {
    signale.fatal(new Error('Unable to read file', err))
  }
}
