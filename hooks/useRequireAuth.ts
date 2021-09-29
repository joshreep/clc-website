import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useAuth from './useAuth'

/**
 * This hook provides a way to redirect the user if they are signed out and trying to view a page that should require
 * them to be authenticated.
 * @param redirectUrl a path to redirect to if the user is not authenticated
 */
export default function useRequireAuth(redirectUrl = '/') {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (user === false) {
            router.push(redirectUrl)
        }
    }, [user, redirectUrl, router])
}
