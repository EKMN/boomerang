const { JSDOM } = require('jsdom')
const hash = require('keccak')

module.exports = ({ html, instructions }) => {
  const dom = new JSDOM(html)

  if (!instructions) {
    return Promise.reject(Error('Please provide one or more instructions'))
  }

  return instructions.map(({ instruction, selector }) => {
    const content = [ ...dom.window.document.querySelectorAll(selector) ].map((node, index) => {
      return {
        hash: hash('keccak256').update(node.textContent).digest('hex'),
        value: node.textContent,
        index
      }
    })

    return {
      instruction,
      content
    }
  })
}
