import { AstNode } from "./MarkdownParser"

// Recursively renders the markdown AST given a map of renderers.

export interface AstRendererOptions<RenderedNode> {
	root: (children: Array<RenderedNode>) => RenderedNode
	text: (children: string) => RenderedNode
	tags: {
		[key: string]: (
			props: { [key: string]: string },
			children: Array<RenderedNode>
		) => RenderedNode
	}
}

export default class AstRenderer<RenderedNode> {
	private options: AstRendererOptions<RenderedNode>

	constructor(options: AstRendererOptions<RenderedNode>) {
		this.options = options
	}

	renderNode = (node: AstNode): RenderedNode => {
		if (node.type === "text") {
			return this.options.text(node.value)
		} else {
			const renderFn = this.options.tags[node.tag]
			if (!renderFn) {
				throw new Error("`" + node.tag + "` renderer not defined")
			}
			const children = node.children.map(this.renderNode)
			return renderFn(node.props, children)
		}
	}

	public render = (nodes: Array<AstNode>) => {
		const children = nodes.map(this.renderNode)
		return this.options.root(children)
	}
}
