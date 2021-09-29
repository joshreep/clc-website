import { useEffect, useState, RefObject } from 'react'

/**
 * This hook allows you to easily detect when an element is visible on the screen as well as specify how much of the
 * element should be visible before considered on screen. Perfect for lazy loading images or triggering animations when
 * the user has scrolled down to a particular section
 * @param ref - an object ref to watch for screen visibility
 * @param rootMargin - amount to offset the observer
 * @example
 * function App() {
 *   // Ref for the element that we want to detect whether on screen
 *   const ref = useRef();
 *   // Call the hook passing in ref and root margin
 *   // In this case it would only be considered onScreen if more ...
 *   // ... than 300px of element is visible.
 *   const onScreen = useOnScreen(ref, '-300px');
 *
 *   return (
 *     <div>
 *       <div style={{ height: '100vh' }}>
 *         <h1>Scroll down to next section 👇</h1>
 *       </div>
 *       <div
 *         ref={ref}
 *         style={{
 *           height: '100vh',
 *           backgroundColor: onScreen ? '#23cebd' : '#efefef'
 *         }}
 *       >
 *         {onScreen ? (
 *           <div>
 *             <h1>Hey I'm on the screen</h1>
 *             <img src="https://i.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif" />
 *           </div>
 *         ) : (
 *           <h1>Scroll down 300px from the top of this section 👇</h1>
 *         )}
 *       </div>
 *     </div>
 *   );
 * }
 */
function useOnScreen<T extends HTMLElement>(ref: RefObject<T>, rootMargin = '0px') {
    const [isIntersecting, setIsIntersecting] = useState(false)

    useEffect(() => {
        const element = ref.current
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting)
            },
            { rootMargin }
        )

        if (element) observer.observe(element)

        return () => {
            if (element) observer.unobserve(element)
        }
    }, [ref, rootMargin])

    return isIntersecting
}

export default useOnScreen
