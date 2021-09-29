import { renderHook, act } from '@testing-library/react-hooks'
import useEventListener from './useEventListener'

describe('useEventListener', () => {
    const handler = jest.fn()
    let unmount: () => boolean

    beforeEach(() => {
        const hook = renderHook(() => useEventListener('click', handler, window))
        unmount = hook.unmount
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    test('should add an event listener', () => {
        expect(handler).not.toHaveBeenCalled()

        act(() => {
            window.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        })

        expect(handler).toHaveBeenCalledTimes(1)
    })

    test('should remove the event listener on un-mount', () => {
        const removeEventListenerSpy = spyOn(window, 'removeEventListener')

        expect(removeEventListenerSpy).not.toHaveBeenCalled()

        unmount()

        expect(removeEventListenerSpy).toHaveBeenCalled()
    })
})
