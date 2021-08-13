const formatDate = require("./formatDate")
// @ponicode
describe("formatDate.default.formatDate", () => {
    test("0", () => {
        let callFunction = () => {
            formatDate.default.formatDate("01-01-2030")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            formatDate.default.formatDate("01-13-2020")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            formatDate.default.formatDate("01-01-2020")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            formatDate.default.formatDate("32-01-2020")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            formatDate.default.formatDate(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
