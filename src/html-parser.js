const htmlparser = require('htmlparser')

// A simple wrapper around htmlparser's horrible API that's synchronous but
// makes you provide a callback anyways.
module.exports = class HtmlParser {
  constructor(options) {
    this.options = options
    this.parse = this._parse.bind(this)
  }
  _parse(htmlString) {
    let result = null
    let error = null

    const handler = new htmlparser.DefaultHandler((e, r) => {
      error = e
      result = r
    })
    const parser = new htmlparser.Parser(handler)
    parser.parseComplete(htmlString)

    if (error) {
      throw e
    }
    return result
  }
}
