import useLocalStorage from './useLocalStorage'
import useMedia from './useMedia'
import { useEffect, Dispatch, SetStateAction } from 'react'

/**
 * This hook handles all the stateful logic required to add a **☾ dark mode** toggle.
 * It utilizes localStorage to remember the user's chosen mode, default to their browser or OS level setting
 * using the `prefers-color-scheme` media query and manages the setting of a `.dark-mode` className on `body`
 * to apply your styles
 * @example
 * function App() {
 *   const [darkMode, setDarkMode] = useDarkMode();
 *
 *   return (
 *     <div>
 *       <div className="navbar">
 *         <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
 *       </div>
 *       <Content />
 *     </div>
 *   );
 * }
 */
export default function useDarkMode(): [boolean, Dispatch<SetStateAction<boolean | undefined>>] {
    const [enabledState, setEnabledState] = useLocalStorage<boolean | undefined>('dark-mode-enabled', undefined)

    const prefersDarkMode = useMedia([true], false, ['(prefers-color-scheme: dark)'])

    const enabled = enabledState ?? prefersDarkMode

    useEffect(() => {
        const className = 'dark-mode'
        const element = window.document.body
        if (enabled) {
            element.classList.add(className)
        } else {
            element.classList.remove(className)
        }
    }, [enabled])

    return [enabled, setEnabledState]
}
