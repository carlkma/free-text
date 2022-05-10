
const chai = require('chai')
const expect = chai.expect

const helperModule = require('../dist/playground_helper.js')

describe('Missing Colon', () => {
	describe('A1.1', () => {
		it('First test', () => {
			expect(helperModule.checkMissingColon("for i in range(10)")).to.equal(18)
		})
	})
})

// npx mocha test