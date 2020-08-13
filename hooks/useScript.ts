import { useState, useEffect } from 'react'

const cachedScripts: string[] = []

export default function useScript(src: string) {
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const onScriptLoad = () => {
            setLoaded(true)
            setError(false)
        }

        if (cachedScripts.includes(src)) {
            onScriptLoad()
        } else {
            cachedScripts.push(src)

            const script = document.createElement('script')
            script.src = src
            script.async = true

            const onScriptError = () => {
                const index = cachedScripts.indexOf(src)
                if (index >= 0) cachedScripts.splice(index, 1)
                script.remove()

                setLoaded(true)
                setError(true)
            }

            script.addEventListener('load', onScriptLoad)
            script.addEventListener('error', onScriptError)

            document.body.appendChild(script)

            return () => {
                script.removeEventListener('load', onScriptLoad)
                script.removeEventListener('error', onScriptError)
            }
        }
    }, [src])

    return { loaded, error }
}
