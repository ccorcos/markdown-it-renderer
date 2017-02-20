# Markdown-it Renderer

An abstract syntax tree (AST) parser and renderer for Markdown using `markdown-it`. This package works by rendering a markdown string, parsing the HTML into an AST, and then recursively building up a rendered representation using any kind of component-based library.

## Installation

```sh
npm install --save markdown-it-renderer
```

## Usage

```js
import { AstRenderer, MarkdownParser } from 'markdown-it-renderer'

// Create a component-based renderer. This example is going to use React, but
// you could use any other component-based approach.
const Renderer = new AstRenderer({
  // `root` and `text` are special cases
  root: children => <main children={children}/>,
  text: value => value,
  // the rest are simply mapping xml tags to components
  a: (props, children) => <a {...props} children={children}/>,
  h1: (props, children) => <h1 {...props} children={children}/>,
  h2: (props, children) => <h2 {...props} children={children}/>,
  h3: (props, children) => <h3 {...props} children={children}/>,
  h4: (props, children) => <h4 {...props} children={children}/>,
  h5: (props, children) => <h5 {...props} children={children}/>,
  p: (props, children) => <p {...props} children={children}/>,
  span: (props, children) => <span {...props} children={children}/>,
  strong: (props, children) => <strong {...props} children={children}/>,
  em: (props, children) => <em {...props} children={children}/>,
  a: (props, children) => <a {...props} children={children}/>,
  blockquote: (props, children) => <blockquote {...props} children={children}/>,
  code: (props, children) => <code {...props} children={children}/>,
  pre: (props, children) => <pre {...props} children={children}/>,
  ul: (props, children) => <ul {...props} children={children}/>,
  ol: (props, children) => <ol {...props} children={children}/>,
  li: (props, children) => <li {...props} children={children}/>,
  table: (props, children) => <table {...props} children={children}/>,
  th: (props, children) => <th {...props} children={children}/>,
  tr: (props, children) => <tr {...props} children={children}/>,
  td: (props, children) => <td {...props} children={children}/>,
  hr: (props, children) => <hr {...props} children={children}/>,
  br: (props, children) => <br {...props} children={children}/>,
  img: (props) => <img {...props}/>,
})

const Parser = new MarkdownParser({
  // default options
  linkify: true,
  typographer: true,
})

const markdown = `This is a *markdown* string`

const result = Renderer.render(Parser.parse(markdown))

// The result here is whatever is returned from the `root` render function.
```
