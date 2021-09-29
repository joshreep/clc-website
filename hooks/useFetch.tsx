import useAsync from './useAsync'
import { useState } from 'react'
import NetworkError from '../errors/NetworkError'

function validateResponse(response: Response) {
    if (!response.ok) throw new NetworkError(response)

    if (response.status >= 400) throw new NetworkError(response)
}

/**
 * This hook is a wrapper for useAsync and uses the fetch api to
 * @param input url endpoint or `Request` object
 * @param options options to be passed to fetch api
 * @param immediate if true, calls `fetch` on component mount
 * @example
 * function App() {
 *     const { data, error, execute, status } = useFetch('/api/my/endpoint', { method: 'GET' }, false)
 *
 *     return (
 *         <div>
 *             {status === Status.IDLE && <div>Start your journey by clicking a button</div>}
 *             {status === Status.SUCCESS && <div>{value}</div>}
 *             {status === Status.ERROR && <div>{error}</div>}
 *             <button onClick={execute} disabled={status === Status.PENDING}>
 *                 {status !== Status.PENDING ? 'Click me' : 'Loading...'}
 *             </button>
 *         </div>
 *     )
 * }
 */
export default function useFetch<T>(input: RequestInfo, options: RequestInit = {}, immediate = true) {
    const [progress, setProgress] = useState<number | null>(null)

    async function asyncFunction(): Promise<T> {
        // Step 1: start the fetch and obtain a reader
        const response = await fetch(input, options)

        validateResponse(response)

        if (!response.body) return await response.json()

        const reader = response.body.getReader()

        // Step 2: get total length
        const contentLength = response.headers.get('Content-Length')
        const totalLength = contentLength ? +contentLength : 0

        // Step 3: read the data
        setProgress(0)
        const chunks: Uint8Array[] = []
        while (true) {
            const { done, value } = await reader.read()

            if (done) break

            if (value) {
                chunks.push(value)
                setProgress((prev) => (prev ? prev + value.length : value.length) / totalLength)
            }
        }

        // Step 4: concatenate chunks into single Uint8Array
        const allChunks = new Uint8Array(progress ? progress * totalLength : 0)
        let position = 0
        chunks.forEach((chunk) => {
            allChunks.set(chunk, position)
            position += chunk.length
        })

        // Step 5: decode into string
        const result = new TextDecoder('utf-8').decode(allChunks)

        return JSON.parse(result)
    }

    const async = useAsync<T, NetworkError>(asyncFunction, immediate)

    return { ...async, progress }
}
