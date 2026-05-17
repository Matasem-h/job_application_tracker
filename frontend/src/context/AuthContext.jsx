// Provide authentication ...
import {createContext, useContext, useState, useEffect, Children} from "react";
import {login as loginApi, register as registerApi} from "../services/api";

const AuthContext = createContext();

// Custom hook to ...
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    // On app load, ...
    useEffect (() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser))
        }
        setLoading(false);
    }, []);
    
    // Register a new user ...
    const register = async (email, password) => {
        await registerApi(email, password);
        await login(email, password);
    };

    // Log in ...
    const login = async(email, password) => {
        const response
    }

};












