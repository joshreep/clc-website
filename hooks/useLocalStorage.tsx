import { useState, Dispatch, SetStateAction } from 'react'

/**
 * This hook allows you to sync state to local storage so that it persists through a page refresh.
 * Usage is similar to `useState` except we pass in a local storage key so that we can default to a value 
 * on page load instead of the specified initial value
 * @param key key in `localStorage` to use
 * @param initialValue value to use if localStorage does not have a value set
 * @example
 * function App() {
 *   // Similar to useState but first arg is key to the value in local storage.
 *   const [name, setName] = useLocalStorage<string>('name', 'Bob');
 * 
 *   return (
 *     <div>
 *       <input
 *         type="text"
 *         placeholder="Enter your name"
 *         value={name}
 *         onChange={e => setName(e.target.value)}
 *       />
 *     </div>
 *   );
}
 */
export default function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState<T>(getValue)

    function getValue() {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    }

    function setValue(value: SetStateAction<T>) {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error(error)
        }
    }

    return [storedValue, setValue]
}
