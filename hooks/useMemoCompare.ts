import { useRef, useEffect } from 'react'

type CompareFunction<T> = (previous: T | undefined, next: T) => boolean

/**
 * This hook is similar to `useMemo`, but instead of passing an array of dependencies,
 * we pass a custom compare function that receives the previous and new value.
 * The compare function can then compare nested properties, call object methods, or anything else to determine equality.
 * If the compare function returns `true`, then the hook returns the old object reference
 * @param next The object to compare to the previous value
 * @param compare A function to compare the previous and the next values
 * @example
 * function MyComponent({ obj }) {
 *   const [state, setState] = useState();
 *
 *   // Use the previous obj value if the "id" property hasn't changed
 *   const objFinal = useMemoCompare(obj, (prev, next) => {
 *     return prev && prev.id === next.id;
 *   });
 *
 *   // Here we want to fire off an effect if objFinal changes.
 *   // If we had used obj directly without the above hook and obj was technically a
 *   // new object on every render then the effect would fire on every render.
 *   // Worse yet, if our effect triggered a state change it could cause an endless loop
 *   // where effect runs -> state change causes re-render -> effect runs -> etc ...
 *   useEffect(() => {
 *     // Call a method on the object and set results to state
 *     return objFinal.someMethod().then((value) => setState(value));
 *   }, [objFinal]);
 *
 *   // So why not pass [obj.id] as the dependency array instead?
 *   useEffect(() => {
 *     // Then eslint-plugin-hooks would rightfully complain that obj is not in the
 *     // dependency array and we'd have to use eslint-disable-next-line to work around that.
 *     // It's much cleaner to just get the old object reference with our custom hook.
 *     return obj.someMethod().then((value) => setState(value));
 *   }, [obj.id]);
 *
 *   return <div> ... </div>;
 * }
 */
export default function useMemoCompare<T>(next: T, compare: CompareFunction<T>) {
    const previous = useRef<T>()

    const isEqual = compare(previous.current, next)

    useEffect(() => {
        if (!isEqual) {
            previous.current = next
        }
    })

    return isEqual ? previous.current : next
}
