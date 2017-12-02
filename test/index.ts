import test from "ava"
import { AstRenderer, MarkdownParser } from "../src"

test("string renderer", t => {
	const propsToAttrs = props =>
		Object.keys(props)
			.map(key => `${key}="${props[key]}"`)
			.join(" ")

	const tag = name => (props, children) =>
		children.length === 0
			? `<${name} ${propsToAttrs(props)}/>`
			: `<${name} ${propsToAttrs(props)}>${children.join("")}</${name}>`

	const Renderer = new AstRenderer<string>({
		root: children => children.join(""),
		text: value => value,
		tags: {
			a: tag("a"),
			h1: tag("h1"),
			h2: tag("h2"),
			h3: tag("h3"),
			h4: tag("h4"),
			h5: tag("h5"),
			p: tag("p"),
			span: tag("span"),
			strong: tag("strong"),
			em: tag("em"),
			blockquote: tag("blockquote"),
			code: tag("code"),
			pre: tag("pre"),
			ul: tag("ul"),
			ol: tag("ol"),
			li: tag("li"),
			table: tag("table"),
			th: tag("th"),
			tr: tag("tr"),
			td: tag("td"),
			hr: tag("hr"),
			br: tag("br"),
			img: tag("img"),
		},
	})

	const Parser = new MarkdownParser({
		// default options
		linkify: true,
		typographer: true,
	})

	const assert = (args: { md: string; html: string }) => {
		t.is(Renderer.render(Parser.parse(args.md)), args.html)
	}

	assert({
		md: "This is a *markdown* string.",
		html: "<p >This is a <em >markdown</em> string.</p>",
	})
})
