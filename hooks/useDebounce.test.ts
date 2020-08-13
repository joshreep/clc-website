import useDebounce from './useDebounce'
import { renderHook } from '@testing-library/react-hooks'

describe('useDebounce', () => {
    test('should set value', () => {
        const { result } = renderHook(() => useDebounce('foo', 1000))

        expect(result.current).toEqual('foo')
    })

    test('should change value after delay', () => {
        let value = 'foo'
        const { result, rerender } = renderHook(() => useDebounce(value, 1000))

        value = 'bar'
        rerender()

        expect(result.current).toEqual('foo')
        setTimeout(() => {
            expect(result.current).toEqual('bar')
        }, 1000)
    })
})
