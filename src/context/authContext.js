import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:3001/api/login", inputs, {withCredentials: true});
        setCurrentUser(res.data);
    };

    const logout = async (inputs) => {
        await axios.post("http://localhost:3001/api/logout", inputs, {}, {withCredentials: true});
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
           {children}
        </AuthContext.Provider>
    );
};