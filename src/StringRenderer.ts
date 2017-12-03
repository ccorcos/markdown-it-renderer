import Renderer from "./Renderer"
import AstRenderer, { AstRendererOptions } from "./AstRenderer"

export function propsToAttrs(props: { [key: string]: string }) {
	return Object.keys(props)
		.map(key => `${key}="${props[key]}"`)
		.join(" ")
}

export function tag(
	name: string,
	props: { [key: string]: string },
	children: Array<string>
) {
	return children.length === 0
		? `<${name} ${propsToAttrs(props)}/>`
		: `<${name} ${propsToAttrs(props)}>${children.join("")}</${name}>`
}

export default class StringRenderer extends Renderer<string> {
	constructor(
		options: AstRendererOptions<string> = {},
		plugins: Array<any> = []
	) {
		const merged = {
			root: children =>
				options.root ? options.root(children) : children.join(""),
			text: value => (options.text ? options.text(value) : value),
			tag: (name, props, children) => {
				if (options.tag) {
					const result = options.tag(name, props, children)
					if (result !== undefined) {
						return result
					}
				}
				return tag(name, props, children)
			},
		}
		super(merged, plugins)
	}
}
