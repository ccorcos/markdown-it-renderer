# Markdown-it Renderer

An abstract syntax tree (AST) parser and renderer for Markdown using `markdown-it`. This package works by rendering a markdown string, parsing the HTML into an AST, and then recursively building up a rendered representation using any kind of component-based library.

## Installation

```sh
npm install --save markdown-it-renderer
```

## Basic Usage

```jsx
import ReactRenderer from 'markdown-it-renderer/ReactRenderer'

const renderer = new ReactRenderer({
	tag: (name, props, children) => {
		if (name === "p") {
			return <p className="custom-paragraph" children={children}/>
		}
	}
})

const result = renderer.render(`This is a *markdown* string`)
ReactDOM.render(result, document.querySelector("#root"))
```
