import { useState, useEffect } from 'react'
import useEventListener from './useEventListener'

type WindowSize = { width?: number; height?: number }

/**
 * This hook returns an object containing the window's width and height.
 * If executed server-side (no window object) the value of width and height will be undefined.
 * @example
 * function App() {
 *     // or const size = useWindowSize();
 *     const { width, height } = useWindowSize();
 *
 *     return (
 *         <div>
 *             {width}px / {height}px
 *         </div>
 *     );
 * }
 */
export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>({ width: undefined, height: undefined })

    function handleResize() {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    useEventListener('resize', handleResize, window)

    useEffect(() => {
        handleResize()
    }, [])

    return windowSize
}
