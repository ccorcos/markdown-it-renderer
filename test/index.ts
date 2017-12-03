//
// todo: Renderer abstraction with extension
// - string renderer
// - react renderer
//

import test from "ava"
import * as ReactDOMServer from "react-dom/server"
import StringRenderer from "../src/StringRenderer"
import ReactRenderer from "../src/ReactRenderer"

test("string renderer", t => {
	const renderer = new StringRenderer()

	const assert = (args: { md: string; html: string }) => {
		t.is(renderer.render(args.md), args.html)
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
			ReactDOMServer.renderToStaticMarkup(renderer.render(args.md) as any),
			args.html
		)
	}

	assert({
		md: "This is a *markdown* string.",
		html: "<main><p>This is a <em>markdown</em> string.</p></main>",
	})
})
