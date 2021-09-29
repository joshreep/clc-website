import { useState, useEffect, useCallback } from 'react'
import useComponentIsMounted from './useComponentIsMounted'
import { Status } from '../types/status'

/**
 * This hook keeps track of all state relevant to the async request
 * @param asyncFunction asynchronous function to be invoked
 * @param immediate if true, runs async function on component mount
 * @example
 * function App() {
 *   const { execute, status, value, error } = useAsync(myFunction, false);
 *
 *   return (
 *     <div>
 *       {status === 'idle' && <div>Start your journey by clicking a button</div>}
 *       {status === 'success' && <div>{value}</div>}
 *       {status === 'error' && <div>{error}</div>}
 *       <button onClick={execute} disabled={status === 'pending'}>
 *         {status !== 'pending' ? 'Click me' : 'Loading...'}
 *       </button>
 *     </div>
 *   );
 * }
 *
 * // An async function for testing our hook.
 * // Will be successful 50% of the time.
 * function myFunction() {
 *   return new Promise((resolve, reject) => {
 *     setTimeout(() => {
 *       const rnd = Math.random() * 10;
 *       rnd <= 5
 *         ? resolve('Submitted successfully 🙌')
 *         : reject('Oh no there was an error 😞');
 *     }, 2000);
 *   });
 * };
 */
export default function useAsync<T, E = string>(asyncFunction: () => Promise<T>, immediate = true) {
    const [status, setStatus] = useState<Status>(Status.IDLE)
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<E | null>(null)

    const componentIsMounted = useComponentIsMounted()

    const execute = useCallback(async () => {
        setStatus(Status.PENDING)
        setError(null)

        try {
            const response = await asyncFunction()
            if (componentIsMounted) {
                setData(response)
                setStatus(Status.SUCCESS)
            }
        } catch (error) {
            if (componentIsMounted) {
                setData(null)
                setError(error)
                setStatus(Status.ERROR)
            }
        }
    }, [asyncFunction, componentIsMounted])

    useEffect(() => {
        if (immediate) {
            execute()
        }
    }, [execute, immediate])

    return { error, execute, status, data }
}
