import isHrefLocal from './isHrefLocal'

describe('isHrefLocal', () => {
    test('should return true if local', () => {
        expect(isHrefLocal('/foo/bar')).toBe(true)
        expect(isHrefLocal('/foo/bar/')).toBe(true)
        expect(isHrefLocal('/foo/bar/foo/bar/foo/bar/foo/bar')).toBe(true)
    })

    test('should return false if not local', () => {
        expect(isHrefLocal('https://www.google.com')).toBe(false)
        expect(isHrefLocal('https://www.google.com/foo/bar')).toBe(false)
    })

    test('should return false if nothing passed in', () => {
        expect(isHrefLocal()).toBe(false)
    })
})
