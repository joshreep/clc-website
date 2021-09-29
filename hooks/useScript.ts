import { useState, useEffect } from 'react'
import { Status } from 'types/status'

/**
 * This hooks makes it super easy to dynamically load an external
 * script and know when its loaded. This is useful when you need
 * to interact with a 3rd party library and you'd prefer to load
 * the script when needed rather then include it in the document
 * head for every page request
 * @param src link to script
 * @example
 * function App() {
 *   const status = useScript('https://cdn.my-webstite.com/script.js');
 *
 *   return (
 *     <div>
 *       <div>
 *         Script status: <b>{status}</b>
 *       </div>
 *       {status === "ready" && (
 *         <div>
 *           Script function call response: <b>{TEST_SCRIPT.start()}</b>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 */
export default function useScript(src?: string) {
    const [status, setStatus] = useState<Status | string>(src ? Status.PENDING : Status.IDLE)

    useEffect(() => {
        // Allow falsy src value if waiting on other data needed fo constructing the script URL passed to this hook.
        if (!src) {
            setStatus(Status.IDLE)
            return
        }

        let script = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)

        if (!script) {
            script = document.createElement('script')
            script.src = src
            script.async = true
            script.setAttribute('data-status', Status.PENDING)
            document.body.appendChild(script)

            const setAttributeFromEvent = (event: Event) => {
                script?.setAttribute('data-status', event.type === 'load' ? Status.SUCCESS : Status.ERROR)
            }

            script.addEventListener('load', setAttributeFromEvent)
            script.addEventListener('error', setAttributeFromEvent)
        } else {
            const dataStatus = script.getAttribute('data-status')
            if (dataStatus && dataStatus in Status) {
                setStatus(dataStatus)
            }
        }

        const setStateFromEvent = (event: Event) => {
            setStatus(event.type === 'load' ? Status.SUCCESS : Status.ERROR)
        }

        script.addEventListener('load', setStateFromEvent)
        script.addEventListener('error', setStateFromEvent)

        return () => {
            script?.removeEventListener('load', setStateFromEvent)
            script?.removeEventListener('error', setStateFromEvent)
        }
    }, [src])

    return status
}
