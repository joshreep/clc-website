import { useState, useRef, MutableRefObject } from 'react'
import useEventListener from './useEventListener'

/**
 * Detect whether the mouse is hovering an element.
 * The hook returns a ref and a boolean value indicating whether the element with that ref is currently being hovered.
 * Just add the returned ref to any element whose hover state you want to monitor.
 * **_One potential bug with this method_**: If you have logic that changes the element that hoverRef is added to then your event listeners will not necessarily get applied to the new element.
 * If you need this functionality then use this alternate version that utilizes a callback ref.
 *
 * @example
 * function App() {
 *     const [hoverRef, isHovered] = useHover();
 *
 *     return (
 *         <div ref={hoverRef}>
 *             {isHovered ? '😁' : '🙁'}
 *         </div>
 *     );
 * }
 */
export default function useHover(): [MutableRefObject<HTMLElement | undefined>, boolean] {
    const [value, setValue] = useState(false)
    const ref = useRef<HTMLElement | undefined>(undefined)

    const handleMouseOver = () => setValue(true)
    const handleMouseOut = () => setValue(false)

    useEventListener('mouseover', handleMouseOver, ref.current)
    useEventListener('mouseout', handleMouseOut, ref.current)

    return [ref, value]
}
