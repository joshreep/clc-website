import { useReducer, useEffect } from 'react'
import useMemoCompare from './useMemoCompare'
import { Status } from '../types/status'
import { firestore } from 'firebase-admin'

interface BaseDocData {
    id: string
}

interface ReturnData<T> extends firestore.DocumentReference<T> {
    id: string
}

type State<T> =
    | { status: Status.IDLE }
    | { status: Status.PENDING }
    | { status: Status.SUCCESS; data: T | undefined }
    | { status: Status.ERROR; error: Error }

type Action<T> =
    | { type: Status.IDLE }
    | { type: Status.PENDING }
    | { type: Status.SUCCESS; payload: T | undefined }
    | { type: Status.ERROR; payload: Error }

type Reducer<T> = React.Reducer<State<T>, Action<T>>

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
    switch (action.type) {
        case Status.IDLE:
            return { status: Status.IDLE }

        case Status.PENDING:
            return { status: Status.PENDING }

        case Status.SUCCESS:
            return { status: Status.SUCCESS, data: action.payload }

        case Status.ERROR:
            return { status: Status.ERROR, error: action.payload }

        default:
            throw new Error(
                'ERROR: Unsupported action type passed to reducer. Please use one of `IDLE`, `PENDING`, `SUCCESS`, or `ERROR`'
            )
    }
}

/**
 * This hook makes it easy to subscribe to data in the Firestore database without having
 * to worry about state management.  Simply pass a query to `useFireStoreQuery()`
 * and you get back everything you need, including `status`, `data`, and `error`
 * Your component will re-render when data changes and your subscription will be automatically removed when the component unmounts
 * @param query a firestore query
 * @example
 * function ProfilePage({ uid }) {
 *   // Subscribe to Firestore document
 *   const { data, status, error } = useFirestoreQuery(
 *     firestore.collection("profiles").doc(uid)
 *   );
 *
 *   if (status === Status.LOADING){
 *     return "Loading...";
 *   }
 *
 *   if (status === Status.ERROR){
 *     return `Error: ${error.message}`;
 *   }
 *
 *   return (
 *     <div>
 *       <ProfileHeader avatar={data.avatar} name={data.name} />
 *       <Posts posts={data.posts} />
 *     </div>
 *   );
 * }
 */
export default function useFireStoreQuery<T>(query?: firestore.DocumentReference<T>) {
    // Our initial state
    const initialState: State<T> = {
        status: query ? Status.PENDING : Status.IDLE,
    }

    const [state, dispatch] = useReducer<Reducer<T>>(reducer, initialState)

    const queryCached = useMemoCompare(query, (prevQuery, nextQuery) => {
        return !!prevQuery && !!nextQuery?.isEqual(prevQuery)
    })

    useEffect(() => {
        if (!queryCached) {
            dispatch({ type: Status.IDLE })
            return
        }

        dispatch({ type: Status.PENDING })

        return queryCached.onSnapshot(
            (response) => {
                dispatch({ type: Status.SUCCESS, payload: response.data() })
            },
            (error) => {
                dispatch({ type: Status.ERROR, payload: error })
            }
        )
    }, [queryCached])

    return state
}
