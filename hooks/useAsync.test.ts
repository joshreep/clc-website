import useAsync from './useAsync'
import { act, renderHook } from '@testing-library/react-hooks'
import { Status } from '../types/status'

function asyncFunctionMockImplementation(success: boolean) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) resolve({ foo: 'bar' })

            reject(new Error('Do not pass go. Do not collect $200'))
        }, 100)
    })
}

describe('useAsync()', () => {
    describe('immediate flag', () => {
        test('should call async callback immediately if set to true', () => {
            const asyncFunctionSpy = jest.fn().mockImplementation(() => asyncFunctionMockImplementation(true))
            renderHook(() => useAsync(asyncFunctionSpy, true))

            expect(asyncFunctionSpy).toHaveBeenCalledTimes(1)
        })

        test('should not call async callback immediately if set to false', () => {
            const asyncFunctionSpy = jest.fn().mockImplementation(() => asyncFunctionMockImplementation(true))
            renderHook(() => useAsync(asyncFunctionSpy, false))

            expect(asyncFunctionSpy).not.toHaveBeenCalled()
        })
    })

    describe('execute', () => {
        test('should call async callback', () => {
            const asyncFunctionSpy = jest.fn().mockImplementation(() => asyncFunctionMockImplementation(true))
            const { result } = renderHook(() => useAsync(asyncFunctionSpy, false))

            expect(asyncFunctionSpy).not.toHaveBeenCalled()

            act(() => {
                result.current.execute()
            })

            expect(asyncFunctionSpy).toHaveBeenCalledTimes(1)
        })
    })

    describe('successful callback', () => {
        test.skip('should return the correct data', async () => {
            const asyncFunctionSpy = jest.fn().mockImplementation(() => asyncFunctionMockImplementation(true))
            const { result, waitFor } = renderHook(() => useAsync<{ foo: string }, Error>(asyncFunctionSpy, false))

            act(() => {
                result.current.execute()
            })

            await waitFor(() => result.current.data != null)

            expect(result.current.data?.foo).toBe('bar')
            expect(result.current.status).toBe(Status.SUCCESS)
            expect(result.current.error).toBeNull()
        })
    })

    describe('unsuccessful callback', () => {
        test.skip('should return the correct data', async () => {
            const asyncFunctionSpy = jest.fn().mockImplementation(() => asyncFunctionMockImplementation(false))
            const { result, waitFor } = renderHook(() => useAsync<{ foo: string }, Error>(asyncFunctionSpy, false))

            act(() => {
                result.current.execute()
            })

            await waitFor(() => result.current.error != null)

            expect(result.current.data).toBeNull()
            expect(result.current.status).toBe(Status.ERROR)
            expect(result.current.error).toBeInstanceOf(Error)
        })
    })
})
