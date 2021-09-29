import { useReducer, useCallback } from 'react'

enum ActionType {
    UNDO = 'UNDO',
    REDO = 'REDO',
    SET = 'SET',
    CLEAR = 'CLEAR',
}

type State<T> = {
    past: T[]
    present: T
    future: T[]
}

type Action<T> =
    | { type: ActionType.UNDO }
    | { type: ActionType.REDO }
    | { type: ActionType.SET; newPresent: T }
    | { type: ActionType.CLEAR; initialPresent: T }

type Reducer<T> = React.Reducer<State<T>, Action<T>>

const initialState = {
    past: [],
    present: null,
    future: [],
}

/**
 * reducer for use history state
 * @param state the previous state
 * @param action action describing the state changes
 */
function reducer<T>(state: State<T>, action: Action<T>) {
    const { past, present, future } = state

    switch (action.type) {
        case ActionType.UNDO:
            return {
                past: past.slice(0, past.length - 1),
                present: past[past.length - 1],
                future: [present, ...future],
            }

        case ActionType.REDO:
            return {
                past: [...past, present],
                present: future[0],
                future: future.slice(1),
            }

        case ActionType.SET:
            if (action.newPresent === present) return state

            return {
                past: [...past, present],
                present: action.newPresent,
                future: [],
            }

        case ActionType.CLEAR:
            return {
                ...initialState,
                present: action.initialPresent,
            }

        default:
            return state
    }
}

/**
 * This hook makes it really easy to add undo/redo functionality
 * @param initialPresent The initial value for the state
 */
export default function useHistory<T>(initialPresent: T) {
    const [state, dispatch] = useReducer<Reducer<T>>(reducer, { ...initialState, present: initialPresent })

    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0

    const undo = useCallback(() => {
        if (canUndo) dispatch({ type: ActionType.UNDO })
    }, [canUndo])

    const redo = useCallback(() => {
        if (canRedo) dispatch({ type: ActionType.REDO })
    }, [canRedo])

    const setState = useCallback((newPresent: T) => {
        dispatch({ type: ActionType.SET, newPresent })
    }, [])

    const clear = useCallback(() => {
        dispatch({ type: ActionType.CLEAR, initialPresent })
    }, [initialPresent])

    // If needed we could also return past and future state
    return { state: state.present, setState, undo, redo, clear, canUndo, canRedo }
}
