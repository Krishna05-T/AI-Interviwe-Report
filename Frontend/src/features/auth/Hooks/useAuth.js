import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context"
import { register, login, logout, getUser, UpdatePass } from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)
    // AuthContext provide value so we desturcture it

    const { user, setUser, loading, setLoading } = context;

    // hook layer maintane flow mean when user login, for login we call api, but before calling api we show loading screen to user, so set loading part true here

    const handleLogin = async ({ username, email, password }) => {
        setLoading(true)
        //we set here but loading screen ui code on ui layer
        try {
            const data = await login({ username, email, password })
            // login => service: auth.api.js : login => axios => Backend => routes: user.route.js: login => controller: user.controller.js: return "response" jo postman me aara tha to ab
            setUser(data.data.loggedInUser)
        } catch (error) {
            console.log("Error occrue in handleLogin ", error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ fullname, username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ fullname, username, email, password });
            if (!data) {
                return;
            }
            setUser(data.data)
        } catch (error) {
            console.log("Error occrue in handleRegister ", error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            const data = await logout();
            setUser(null);
        } catch (error) {
            console.log("Error occur in handleLogout ", error.message)
        } finally {
            setLoading(false)
        }
    }

    // const handleGetUser = async () => {
    //     setLoading(true);
    //     try {
    //         const data = await getUser();
    //         setUser(data.data)
    //     } catch (error) {
    //         console.log("Error occure in handleGetUser", error)
    //     } finally {
    //         setLoading(false)
    //     }

    // }

    const handleUpdatePass = async ({ oldPassword, newPassword, confirmPass }) => {
        setLoading(true)
        try {
            const data = await UpdatePass({ oldPassword, newPassword, confirmPass });
            return data
        } catch (error) {
            console.log("Error occur in handleUpdataPass ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try{
                const data = await getUser();

                if(data?.data) {
                    setUser(data.data)
                } else {
                    setUser(null)
                }
            } catch(error) {
                setUser(null);
            } finally {
                setLoading(false)
            }
        }
        getAndSetUser()
    }, [])
    //     This useEffect runs once when the app/component loads.
    // It calls getUser() to check if the user is already logged in, usually using saved cookies/session.
    // If the backend returns a user, setUser(data.data) updates the initial null user to the logged-in user.
    // useEffect helps because this check happens automatically after the first render, without needing the user to click anything.

    return { user, loading, handleLogin, handleRegister, handleLogout, handleUpdatePass }
}

