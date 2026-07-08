import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials : true
})  // thing which use repeatally create here

export const register = async ({fullname, username, email, password}) => {
    try {

        if(!fullname || !username || !email || !password) {
            throw new Error("All field are required")
        }

        const respones = await api.post('/users/register', { fullname, username, email, password })

        return respones.data
    } catch (error) {
        throw error
    }
}

export const login = async ({username, email, password}) => {
    try {
        const respones = await api.post('/users/login', {
            username, email, password
        })

        return respones.data
    } catch (error) {
        throw error
    }
}

export const logout = async () => {
    try {
        const respones = await api.post('/users/logout',{})

        return respones.data;
    } catch (error) {
        console.log("Unable to logout "+ error.message)
    }
}

export const getUser = async () => {
    try {
        const respones = await api.get('/users/get-user')

        return respones.data;
    } catch (error) {
        console.log("Unable to fetch user information ", error)
    }
}

export const UpdatePass = async ({oldPassword, newPassword, confirmPass}) => {
    try {
        const respones = await api.post('/users/update-password', {
            oldPassword,
            newPassword,
            confirmPass
        })
    
        return respones.data;
    } catch (error) {
        console.log("Unable to update password ", error)
    }
}
