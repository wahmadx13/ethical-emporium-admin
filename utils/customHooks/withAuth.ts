import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useAuth = () => {
    const [authenticating, setAuthenticating] = useState(true);
    const [authenticated, setAuthenticated] = useState(false)

    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('api/auth-check');
                if (response.status === 200) {
                    setAuthenticated(true)
                    setAuthenticating(false);
                } else {
                    setAuthenticating(false)
                }
            } catch (err) {
                console.error('Authentication error: ', err)
                setAuthenticating(false)
            }
        }
        checkAuth()
    }, [])

    useEffect(() => {
        if (!authenticating && !authenticated) {
            router.push('/auth/sign-in')
        }
    }, [authenticating, authenticated, router])

    return { authenticating, authenticated }
}

export default useAuth
