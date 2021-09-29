import { useRef, useEffect } from 'react'

type EventListenerElement = HTMLElement | (Window & typeof globalThis)

/**
 * This hook handles checking if `addEventListener` is supported, adding the event listener, and removal on cleanup
 * @param eventName name of event to listen to
 * @param handler function to handle event
 * @param element element to bind eventListener to
 * @example
 * function App(){
 *   // State for storing mouse coordinates
 *   const [coords, setCoords] = useState({ x: 0, y: 0 });
 *
 *   // Event handler utilizing useCallback ...
 *   // ... so that reference never changes.
 *   const handler = useCallback(
 *     ({ clientX, clientY }) => {
 *       // Update coordinates
 *       setCoords({ x: clientX, y: clientY });
 *     },
 *     [setCoords]
 *   );
 *
 *   // Add event listener using our hook
 *   useEventListener('mousemove', handler);
 *
 *   return (
 *     <h1>
 *       The mouse position is ({coords.x}, {coords.y})
 *     </h1>
 *   );
 * }
 */
export default function useEventListener(eventName: string, handler: Function, element?: EventListenerElement) {
    const savedHandler = useRef(handler)

    useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        const isSupported = element && element.addEventListener
        if (!isSupported) {
            console.warn('WARNING: The given element does not support event handlers')
            return
        }

        if (!element) return

        const eventListener = (event: Event) => savedHandler.current(event)

        element.addEventListener(eventName, eventListener)

        return () => {
            element.removeEventListener(eventName, eventListener)
        }
    }, [element, eventName])
}
