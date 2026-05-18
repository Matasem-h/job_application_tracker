// This file provides authentication state and functions to the entire app 
import {createContext, useContext, useState, useEffect} from "react";
import {login as loginApi, register as registerApi} from "../services/api";

const AuthContext = createContext();

// Accessing auth context from any component
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // On app start, verifying if token already exists in the local storage
    useEffect (() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser))
        }
        setLoading(false);
    }, []);
    
    // Registering new users and saving their tokens
    const register = async (email, password) => {
        await registerApi(email, password);
        await login(email, password);
    };

    // Logging in and storing the user and their token in the local storage
    const login = async(email, password) => {
        const response = await loginApi(email, password);
        const {token, user} = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setUser(user);
    };

    // Logging out and clearing all stored data
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, token, login, register, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};


