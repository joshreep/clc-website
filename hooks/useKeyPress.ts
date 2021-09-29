import { useState } from 'react'
import useEventListener from './useEventListener'

/**
 * This hook makes it easy to detect when the user is pressing a specific key on their keyboard.
 * @param targetKey The key in which you wish to monitor
 * @example
 * function App() {
 *     // Call our hook for each key that we'd like to monitor
 *     const happyPress = useKeyPress('h');
 *     const sadPress = useKeyPress('s');
 *     const robotPress = useKeyPress('r');
 *     const foxPress = useKeyPress('f');
 *
 *     return (
 *         <div>
 *             <div>h, s, r, f</div>
 *             <div>
 *                 {happyPress && '😊'}
 *                 {sadPress && '😢'}
 *                 {robotPress && '🤖'}
 *                 {foxPress && '🦊'}
 *             </div>
 *         </div>
 *     );
 * }
 */
export function useSingleKeyPress(targetKey: string) {
    const [keyPressed, setKeyPressed] = useState(false)

    function downHandler({ key }: KeyboardEvent) {
        if (key === targetKey) setKeyPressed(true)
    }

    function upHandler({ key }: KeyboardEvent) {
        if (key === targetKey) setKeyPressed(false)
    }

    useEventListener('keydown', downHandler, window)
    useEventListener('keyup', upHandler, window)

    return keyPressed
}

type UseMultiKeyPressOptions = {
    strict: boolean
    sameOrder: boolean
}

/**
 * This hook makes it easy to detect when the user is pressing a specific set of keys on their keyboard
 * @param targetKeys an array of keys which you wish to monitor
 * @param options an object of options to configure the hook
 * @param options.strict if true, it will not allow other keys to be pressed that are not defined in `targetKeys`
 * @param options.sameOrder if true, it will not allow keys to be pressed in a different order than defined in `targetKeys`
 * @example
 * function App() {}
 */
export function useMultiKeyPress(
    targetKeys: string[],
    { strict = false, sameOrder = false }: UseMultiKeyPressOptions = { strict: false, sameOrder: false }
) {
    const [keysPressed, setKeysPressed] = useState<string[]>([])

    function downHandler({ key }: KeyboardEvent) {
        setKeysPressed((previousKeys) => [...previousKeys, key])
    }

    function upHandler({ key }: KeyboardEvent) {
        setKeysPressed((previousKeys) => previousKeys.filter((item) => item !== key))
    }

    useEventListener('keydown', downHandler, window)
    useEventListener('keyup', upHandler, window)

    const onlyTargetKeysArePressed = keysPressed.every((value) => targetKeys.includes(value))

    if (sameOrder) return onlyTargetKeysArePressed && targetKeys.every((value, index) => keysPressed[index] === value)

    const allTargetKeysArePressed = targetKeys.every((value) => keysPressed.includes(value))

    if (strict) return allTargetKeysArePressed && onlyTargetKeysArePressed

    return allTargetKeysArePressed
}
