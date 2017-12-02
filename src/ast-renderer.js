// Recursively renders the markdown AST given a map from tag names to render
// functions. There are two special cases for the `root` and `text` nodes.
// ```
// renderFns = {
//   root: ([<html>]) => <html>,
//   text: (<string>) => <html>,
//   <tag-name>: ({<attribute>: <value>}, [<html>]) => <html>,
// }
// ```
module.exports = class AstRenderer {
	constructor(renderFns) {
		this.renderFns = renderFns
		this.renderNode = this._renderNode.bind(this)
		this.render = this._render.bind(this)
	}
	// Lookup render function with error handling
	renderFn(type) {
		const renderFn = this.renderFns[type]
		if (!renderFn) {
			throw new Error("`" + type + "` renderer not defined")
		}
		return renderFn
	}
	_renderNode(node) {
		const renderFn = this.renderFn(node.type)
		if (node.type === "text") {
			return renderFn(node.value)
		}
		const children = node.children.map(this.renderNode)
		return renderFn(node.props, children)
	}
	_render(nodes) {
		const children = nodes.map(this.renderNode)
		const renderFn = this.renderFn("root")
		return renderFn(children)
	}
}
