import { act, renderHook } from '@testing-library/react-hooks'
import useMemoCompare from './useMemoCompare'

const initialProps = { foo: { bar: { baz: 'test' } } }
function compare(previous: typeof initialProps | undefined, next: typeof initialProps) {
    return previous?.foo.bar.baz === next.foo.bar.baz
}

describe('useMemoCompare()', () => {
    test("should return the same value if it doesn't change", () => {
        const { result, rerender } = renderHook(
            (initialProps) => useMemoCompare<typeof initialProps>(initialProps, compare),
            { initialProps }
        )

        rerender(initialProps)

        expect(result.current).toBe(initialProps)
    })

    test('should return the new value if it does change', () => {
        const { result, rerender } = renderHook(
            (initialProps) => useMemoCompare<typeof initialProps>(initialProps, compare),
            { initialProps }
        )

        act(() => {
            rerender({ foo: { bar: { baz: 'test!' } } })
        })

        expect(result.current).not.toBe(initialProps)
    })
})
