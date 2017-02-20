// TODO: plugins, including code highlighting
const MarkdownIt = require('markdown-it')
const HtmlParser = require('./html-parser')

// Parses markdown into an AST that's represented as a list of nodes. Each node
// is either a text node or a component node.
// - `{type: 'text', value: <string>}`
// - `{type: <tag-name>, props: {<attr>: <value>}, children: [<node>]}`
module.exports = class MarkdownParser {
  constructor({linkify=true, typographer=true}={}) {
    this.Markdown = new MarkdownIt({
      html: false,
      xhtmlOut: true,
      breaks: false,
      linkify,
      typographer,
      langPrefix: 'language-',
      highlight(str, lang) {
        return ''
      },
    })
    this.Html = new HtmlParser({
      verbose: false,
      ignoreWhitespace: true,
    })
    this.parse = this._parse.bind(this)
  }
  _parse(markdownString) {
    const htmlString = this.Markdown.render(markdownString)
    const htmlTree = this.Html.parse(htmlString)
    return simplifyTree(htmlTree)
  }
}

function simplifyTree(nodes=[]) {
  return nodes.map(node => {
    if (node.type === 'tag') {
      return {
        type: node.name,
        props: node.attribs || {},
        children: simplifyTree(node.children)
      }
    } else {
      return {
        type: 'text',
        value: node.data
      }
    }
  })
}