import { useEffect, useRef } from 'react'

/**
 * This hook comes in handy when you have an asynchronous operation that sets state. If the process is a long running
 * process that takes seconds or minutes, then it's possible that the component would unmount before the process is
 * finished. This is a problem because you cannot set state on an un-mounted component. Instead, you can simply drop
 * this hook in, and check that component is still mounted before you set your state.
 * @example
 * function myAsyncHook() {
 *   const componentIsMounted = useComponentIsMounted()
 *   const [state, setState] = useState()
 *
 *   const execute = useCallback(async () => {
 *     const data = await someLongRunningProcess()
 *     if (componentIsMounted) {
 *       setState(data)
 *     }
 *   })
 *
 *   useEffect(() => {
 *     execute()
 *   }, [])
 * }
 */
export default function useComponentIsMounted() {
    const componentIsMounted = useRef(true)

    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, [])

    return componentIsMounted.current
}
