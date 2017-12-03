import * as MarkdownIt from "markdown-it"
import HtmlParser from "./HtmlParser"

// Parses markdown into an AST that's represented as a list of nodes.

export default class MarkdownParser {
	private md: MarkdownIt.MarkdownIt
	private html: HtmlParser

	constructor(options: MarkdownIt.Options = {}, plugins: Array<any> = []) {
		this.md = new MarkdownIt({
			...options,
			xhtmlOut: true,
		})
		for (const plugin of plugins) {
			this.md = this.md.use(plugin)
		}
		this.html = new HtmlParser({
			verbose: false,
			ignoreWhitespace: true,
		})
	}

	public parse = (markdown: string) => {
		const html = this.md.render(markdown)
		const ast = this.html.parse(html)
		return simplifyTree(ast)
	}
}

export type AstNode =
	| {
			type: "tag"
			tag: string
			props: { [key: string]: string }
			children: Array<AstNode>
		}
	| { type: "text"; value: string }

function simplifyTree(nodes: Array<any>): Array<AstNode> {
	return nodes.map(node => {
		if (node.type === "tag") {
			return {
				type: "tag",
				tag: node.name,
				props: node.attribs || {},
				children: simplifyTree(node.children || []),
			} as AstNode
		} else {
			return {
				type: "text",
				value: node.data,
			} as AstNode
		}
	})
}
