import { renderHook, HookResult, act } from '@testing-library/react-hooks'
import useHistory from './useHistory'

describe('useHistory', () => {
    describe('state', () => {
        test('initialPresent should set state', () => {
            const { result } = renderHook(() => useHistory(1))
            expect(result.current.state).toEqual(1)
        })
    })

    describe('setState', () => {
        test('should set the state', () => {
            const { result } = renderHook(() => useHistory(1))
            act(() => {
                result.current.setState(10)
            })
            expect(result.current.state).toEqual(10)
        })
    })

    describe('undo', () => {
        test('should set state to past', () => {
            const { result } = renderHook(() => useHistory(1))
            act(() => result.current.setState(2))
            act(() => result.current.undo())
            expect(result.current.state).toEqual(1)
        })
    })

    describe('redo', () => {
        test('should set state back to future', () => {
            const { result } = renderHook(() => useHistory(1))
            act(() => result.current.setState(2))
            act(() => result.current.undo())
            act(() => result.current.redo())
            expect(result.current.state).toEqual(2)
        })
    })

    describe('clear', () => {
        test('should set state to initial state', () => {
            const { result } = renderHook(() => useHistory(1))
            act(() => result.current.setState(100))
            act(() => result.current.clear())
            expect(result.current.state).toEqual(1)
        })
    })

    describe('canUndo', () => {
        test('should be true if past has length', () => {
            const { result } = renderHook(() => useHistory(1))
            act(() => result.current.setState(2))
            expect(result.current.canUndo).toBe(true)
        })

        test('should be false if future has no length', () => {
            const { result } = renderHook(() => useHistory(1))
            expect(result.current.canUndo).toBe(false)
        })
    })

    describe('canRedo', () => {
        test('should be true if future has length', () => {
            const { result } = renderHook(() => useHistory(1))
            act(() => result.current.setState(2))
            act(() => result.current.undo())
            expect(result.current.canRedo).toBe(true)
        })

        test('should be false if future has no length', () => {
            const { result } = renderHook(() => useHistory(1))
            expect(result.current.canRedo).toBe(false)
        })
    })
})
