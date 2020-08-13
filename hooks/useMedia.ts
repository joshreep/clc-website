import { useCallback, useEffect, useState } from 'react'

enum breakPoints {
    XS = '(min-width: 0px)',
    SM = '(min-width: 576px)',
    MD = '(min-width: 768px)',
    LG = '(min-width: 992px)',
    XL = '(min-width: 1200px)',
}

const breakPointsArray = Object.values(breakPoints)

export default function useMedia<T>(values: T[], defaultValue: T, queries: string[] = breakPointsArray) {
    const mediaQueryLists = queries.map((query) => window.matchMedia(query))

    const getValue = useCallback(() => {
        const index = mediaQueryLists.findIndex((mql) => mql.matches)
        return values[index] ?? defaultValue
    }, [defaultValue, mediaQueryLists, values])

    const [value, setValue] = useState(getValue)

    useEffect(() => {
        const handler = () => setValue(getValue)
        mediaQueryLists.forEach((mql) => mql.addListener(handler))

        return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler))
    }, [getValue, mediaQueryLists])

    return value
}
