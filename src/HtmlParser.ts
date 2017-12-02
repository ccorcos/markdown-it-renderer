import * as htmlparser from "htmlparser"

// A simple wrapper around htmlparser's horrible API that's synchronous but
// makes you provide a callback anyways.

export interface HtmlParserOptions {
	verbose?: boolean
	ignoreWhitespace?: boolean
}

export default class HtmlParser {
	private options: HtmlParserOptions

	constructor(options: HtmlParserOptions = {}) {
		this.options = options
	}

	public parse = (html: string) => {
		let result: any = null
		let error: any = null

		const handler = new htmlparser.DefaultHandler((e, r) => {
			error = e
			result = r
		}, this.options)

		const parser = new htmlparser.Parser(handler)
		parser.parseComplete(html)

		if (error) {
			throw error
		}
		return result
	}
}
