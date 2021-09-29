import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

firebase.initializeApp({
    apiKey: '',
    authDomain: '',
    projectId: '',
    appId: '',
})

interface AuthContext {
    signIn?: (email: string, password: string) => Promise<firebase.User | null>
    signUp?: (email: string, password: string) => Promise<firebase.User | null>
    signOut?: () => Promise<void>
    sendPasswordResetEmail?: (email: string) => Promise<boolean>
    confirmPasswordReset?: (code: string, password: string) => Promise<boolean>
    user?: firebase.User | null | false
}

const authContext = createContext<AuthContext>({})

/**
 * Provider hook that creates auth Object and handles state
 */
function useProvideAuth() {
    const [user, setUser] = useState<firebase.User | null | false>(null)

    // wrap any Firebase methods we want to use making sure to save the user to state
    const signIn = async (email: string, password: string) => {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password)
        setUser(response.user)

        return response.user
    }

    const signUp = async (email: string, password: string) => {
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
        setUser(response.user)

        return response.user
    }

    const signOut = async () => {
        await firebase.auth().signOut()
        setUser(false)
    }

    const sendPasswordResetEmail = async (email: string) => {
        await firebase.auth().sendPasswordResetEmail(email)

        return true
    }

    const confirmPasswordReset = async (code: string, password: string) => {
        await firebase.auth().confirmPasswordReset(code, password)

        return true
    }

    // Subscribe to user on mount.
    // Because this sets state in the callback it will cause
    // any component that utilizes this hook to re-render with
    // the latest auth object.
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(false)
            }
        })

        // Cleanup subscription on un-mount
        return unsubscribe
    }, [])

    return { user, signIn, signUp, signOut, sendPasswordResetEmail, confirmPasswordReset }
}

/**
 * Provider component that wraps your app and makes auth object available to any child component that calls `useAuth()`
 * @example
 * function App(props) {
 *     return (
 *         <ProvideAuth>
 *             // Route components here, depending on how your app is structured.
 *             // using Next.js this would be /pages/_app.js
 *         </ProvideAuth>
 *     );
 * }
 */
export function ProvideAuth({ children }: { children: ReactNode }) {
    const auth = useProvideAuth()

    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

/**
 * Hook for child components to get the auth object and re-render when it changes
 * @example
 * function Navbar(props) {
 *   // Get auth state and re-render anytime it changes
 *   const { user, signOut } = useAuth();
 *
 *   return (
 *     <NavbarContainer>
 *       <Logo />
 *       <Menu>
 *         <Link to="/about">About</Link>
 *         <Link to="/contact">Contact</Link>
 *         {auth.user ? (
 *           <Fragment>
 *             <Link to="/account">Account ({user.email})</Link>
 *             <Button onClick={() => signOut()}>Sign Out</Button>
 *           </Fragment>
 *         ) : (
 *           <Link to="/signin">Signin</Link>
 *         )}
 *       </Menu>
 *     </NavbarContainer>
 *   );
 * }
 */
export default function useAuth() {
    return useContext(authContext)
}
