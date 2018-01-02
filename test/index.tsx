//
// todo: Renderer abstraction with extension
// - string renderer
// - react renderer
//

import test from "ava"
import * as React from "react"
import * as ReactDOMServer from "react-dom/server"
import StringRenderer from "../src/StringRenderer"
import ReactRenderer from "../src/ReactRenderer"

test("string renderer", t => {
	const renderer = new StringRenderer()

	const assert = (args: { md: string; html: string }) => {
		t.is(renderer.renderMarkdown(args.md), args.html)
	}

	assert({
		md: "This is a *markdown* string.",
		html: "<p >This is a <em >markdown</em> string.</p>",
	})
})

test("react renderer", t => {
	const renderer = new ReactRenderer()

	const assert = (args: { md: string; html: string }) => {
		t.is(
			ReactDOMServer.renderToStaticMarkup(renderer.renderMarkdown(
				args.md
			) as any),
			args.html
		)
	}

	assert({
		md: "This is a *markdown* string.",
		html: "<main><p>This is a <em>markdown</em> string.</p></main>",
	})
})

test("react component renderer", t => {
	const renderer = new ReactRenderer({
		tag: (name, props, children) => {
			if (name === "Counter") {
				return <div className={`counter-${props.delta}`} />
			}
		},
	})

	const assert = (args: { md: string; html: string }) => {
		t.is(
			ReactDOMServer.renderToStaticMarkup(renderer.renderMarkdown(
				args.md
			) as any),
			args.html
		)
	}

	assert({
		md: "[Counter]{delta: 10}",
		html: `<main><p><div class="counter-10"></div></p></main>`,
	})
})
