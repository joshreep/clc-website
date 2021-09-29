import { useState } from 'react'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import useAsync from './useAsync'

/**
 * This hook is a wrapper around `useAsync` and uses axios to make the http request
 * @param url endpoint to target
 * @param method HTTP method
 * @param config axios config
 * @param immediate if true, the hook will invoke the asyncFunction on component mount
 * @example
 * function App() {
 *     const { data, error, execute, progress, status } = useAxios('/api/my/endpoint')
 *
 *     return (
 *         <div>
 *             {status === Status.IDLE && <div>Start your journey by clicking a button</div>}
 *             {status === Status.SUCCESS && <div>{value}</div>}
 *             {status === Status.ERROR && <div>{JSON.stringify(error)}</div>}
 *             <button onClick={execute} disabled={status === Status.PENDING}>
 *                 {status !== Status.PENDING ? 'Click me' : 'Loading...'}
 *             </button>
 *             <progress value={progress} max={100}>{progress}%</progress>
 *         </div>
 *     )
 * }
 */
export default function useAxios<T>(
    url: string,
    method: Method = 'GET',
    config: AxiosRequestConfig = {},
    immediate = true
) {
    const [progress, setProgress] = useState<number | null>(null)

    function onUploadProgress(event: ProgressEvent<EventTarget>) {
        setProgress((event.loaded / event.total) * 100)
    }

    function onDownloadProgress(event: ProgressEvent<EventTarget>) {
        setProgress((event.loaded / event.total) * 100)
    }

    async function asyncFunction() {
        const response: AxiosResponse<T> = await axios(url, {
            method,
            onUploadProgress,
            onDownloadProgress,
            ...config,
        })

        setProgress(null)

        return response.data
    }

    const async = useAsync<T, AxiosError<T>>(asyncFunction, immediate)

    return { ...async, progress }
}
