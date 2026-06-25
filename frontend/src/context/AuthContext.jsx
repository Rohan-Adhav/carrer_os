import { useState, useContext, createContext, useEffect } from "react";
import { login as loginApi } from "../services/api/auth.api.js";
import { logout as logoutApi } from "../services/api/auth.api.js";
import { getCurrentUser } from "../services/api/auth.api.js";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token") || null)

    const login = async (form) => {
        const data = await loginApi(form)

        let token = data.accessToken
        let user = data.user
        if (token && user) {
            localStorage.setItem("token", token)
            setToken(token)
            setUser(user)
        }
        return data
    }

    const logout = async () => {

        try {
            await logoutApi()

        } catch (err) {
            return
        } finally {
            setToken(null)
            setUser(null)
        }
    }

    const loadUser = async () => {
        try {
            const data = await getCurrentUser()
            setUser(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            await loadUser()
        }
        if (token) {
            fetchUsers()
        }else{
            setUser(null)
        }
    }, [token])

    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
