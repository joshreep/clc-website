import { useEffect, useState, RefObject } from 'react'

export default function useOnScreen(ref: RefObject<HTMLElement>, rootMargin = '0px') {
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
