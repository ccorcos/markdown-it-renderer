import { AstNode } from "./MarkdownParser"

// Recursively renders the markdown AST given a map of renderers.

export interface AstRendererArgs<RenderedNode> {
	root: (children: Array<RenderedNode>) => RenderedNode
	text: (children: string) => RenderedNode
	tag: (
		name: string,
		props: { [key: string]: string },
		children: Array<RenderedNode>
	) => RenderedNode
}

export interface AstRendererOptions<RenderedNode> {
	root?: (children: Array<RenderedNode>) => RenderedNode
	text?: (children: string) => RenderedNode
	tag?: (
		name: string,
		props: { [key: string]: string },
		children: Array<RenderedNode>
	) => RenderedNode | undefined
}

export default class AstRenderer<RenderedNode> {
	private options: AstRendererArgs<RenderedNode>

	constructor(options: AstRendererArgs<RenderedNode>) {
		this.options = options
	}

	renderNode = (node: AstNode): RenderedNode => {
		if (node.type === "text") {
			return this.options.text(node.value)
		} else {
			return this.options.tag(
				node.tag,
				node.props,
				node.children.map(this.renderNode)
			)
		}
	}

	public render = (nodes: Array<AstNode>) => {
		const children = nodes.map(this.renderNode)
		return this.options.root(children)
	}
}
