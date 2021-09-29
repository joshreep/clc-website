import { useRef, useEffect } from 'react'

type Change = {
    from: unknown
    to: unknown
}

/**
 * This hooks makes it easy to see which prop changes are causing a component to re-render.
 * If a function is particularly expensive to run and you know it renders the same results given the same props,
 * you can use the `React.memo` higher order component
 * @param name identifier for this instance of `useWhyDidYouUpdate
 * @param props props to compare
 * @example
 * // Let's pretend this <Counter> component is expensive to re-render so ...
 * // ... we wrap with React.memo, but we're still seeing performance issues :/
 * // So we add useWhyDidYouUpdate and check our console to see what's going on.
 * const Counter = React.memo(props => {
 *     useWhyDidYouUpdate('Counter', props);
 *     return <div style={props.style}>{props.count}</div>;
 * });
 */
export default function useWhyDidYouUpdate<T extends { [key: string]: unknown }>(name: string, props: T) {
    console.warn(
        'WARNING: useWhyDidYouUpdate should only be used for debugging purposes. Please remove before pushing to production'
    )

    const previousProps = useRef<T | undefined>()

    useEffect(() => {
        if (previousProps.current) {
            const allKeys = Object.keys({ ...previousProps.current, ...props })
            const changes: { [key: string]: Change } = {}

            allKeys.forEach((key) => {
                if (previousProps.current && previousProps.current[key] !== props[key]) {
                    changes[key] = {
                        from: previousProps.current[key],
                        to: props[key],
                    }
                }
            })

            if (Object.keys(changes).length) {
                console.log('[why-did-you-update]', name, changes)
            }
        }

        previousProps.current = props
    })
}
