import * as React from "react"
import Renderer from "./Renderer"
import AstRenderer, { AstRendererOptions } from "./AstRenderer"

export default class ReactRenderer extends Renderer<React.ReactNode> {
	constructor(
		options: AstRendererOptions<string> = {},
		plugins: Array<any> = []
	) {
		const merged = {
			root: children =>
				options.root
					? options.root(children)
					: React.createElement("main", {}, ...children),
			text: value => (options.text ? options.text(value) : value),
			tag: (name, props, children) => {
				if (options.tag) {
					const result = options.tag(name, props, children)
					if (result !== undefined) {
						return result
					}
				}
				return React.createElement(name, props, ...children)
			},
		}
		super(merged, plugins)
	}
}
