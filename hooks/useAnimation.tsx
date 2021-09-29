import { useEffect, useState } from 'react'

import easing, { EasingFunctions } from '../utilities/easing'

/**
 * This hook calls useState every animation frame giving you elapsed time and causing a re-render as frequently as
 * possible for a smooth animation
 * @param duration How long (in milliseconds) to run the animation for
 * @param delay How long (in milliseconds) to wait before running the animation
 * @example
 * function useAnimation(easingName: EasingFunctions = EasingFunctions.LINEAR, duration = 500, delay = 0) {
 *     const elapsed = useAnimationTimer(duration, delay)
 *
 *     // Amount of specified duration elapsed on a scale from 0 - 1
 *     const percentElapsed = Math.min(1, elapsed / duration)
 *
 *     // Return altered value based on our specified easing function
 *     return easing[easingName](percentElapsed)
 * }
 */
export function useAnimationTimer(duration = 1000, delay = 0) {
    const [elapsedTime, setElapsedTime] = useState<number>(0)

    useEffect(() => {
        let animationFrame: number, timerStop: NodeJS.Timeout, start: number

        /**
         * Calls `onFrame()` on next animation frame
         */
        function loop() {
            animationFrame = requestAnimationFrame(onFrame)
        }

        /**
         * Function to be executed on each animation frame
         */
        function onFrame() {
            setElapsedTime(Date.now() - start)
            loop()
        }

        /**
         * Starts the loop
         */
        function onStart() {
            timerStop = setTimeout(() => {
                cancelAnimationFrame(animationFrame)
                setElapsedTime(Date.now() - start)
            }, duration)

            start = Date.now()
            loop()
        }

        // start after specified delay (defaults to 0)
        const timerDelay = setTimeout(onStart, delay)

        return () => {
            clearTimeout(timerStop)
            clearTimeout(timerDelay)
            cancelAnimationFrame(animationFrame)
        }
    }, [delay, duration])

    return elapsedTime
}

/**
 * This hook allows you to smoothly animate any value using an easing function
 * @param easingName specifies which easing function to uses
 * @param duration how long (in milliseconds) to run the animation for
 * @param delay how long (in milliseconds) to wait before running the animation
 * @example
 * function App() {
 *   const animation = useAnimation('elastic', 600, 0);
 *
 *   return (
 *       <div style={{ display: 'flex', justifyContent: 'center' }}>
 *           <div style={{ marginTop: animation * 200 - 100 }} />
 *       </div>
 *   );
 * }
 */
export default function useAnimation(easingName: EasingFunctions = EasingFunctions.LINEAR, duration = 500, delay = 0) {
    const elapsed = useAnimationTimer(duration, delay)

    // Amount of specified duration elapsed on a scale from 0 - 1
    const percentElapsed = Math.max(0, Math.min(1, elapsed / duration))

    // Return altered value based on our specified easing function
    return easing[easingName](percentElapsed)
}
