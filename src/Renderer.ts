import AstRenderer, { AstRendererArgs } from "./AstRenderer"
import MarkdownParser, { AstNode } from "./MarkdownParser"

export default class Renderer<RenderedNode> {
	private parser: MarkdownParser
	private renderer: AstRenderer<RenderedNode>

	constructor(
		options: AstRendererArgs<RenderedNode>,
		plugins: Array<any> = []
	) {
		this.parser = new MarkdownParser(
			{
				html: false,
				xhtmlOut: true,
				breaks: false,
				linkify: true,
				typographer: true,
				langPrefix: "language-",
				highlight: (str, lang) => "",
			},
			plugins
		)
		this.renderer = new AstRenderer(options)
	}

	renderMarkdown(markdown: string) {
		return this.renderer.render(this.parser.markdownToAst(markdown))
	}

	renderHtml(html: string) {
		return this.renderer.render(this.parser.htmlToAst(html))
	}

	renderAst(ast: Array<AstNode>) {
		return this.renderer.render(ast)
	}
}
