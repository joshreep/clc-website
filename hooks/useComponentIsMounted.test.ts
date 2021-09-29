import { renderHook } from '@testing-library/react-hooks'
import useComponentIsMounted from './useComponentIsMounted'

describe('useComponentIsMounted()', () => {
    test('should return true if component is mounted', () => {
        const { result } = renderHook(() => useComponentIsMounted())
        expect(result.current).toBe(true)
    })

    test('should return false when unmounted', async () => {
        const { result, unmount } = renderHook(() => useComponentIsMounted())

        setTimeout(() => {
            expect(result.current).toBe(false)
        }, 100)

        unmount()
    })
})
