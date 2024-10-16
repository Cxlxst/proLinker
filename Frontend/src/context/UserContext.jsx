import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Initialisation immédiate avec localStorage
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }
    // }, []);

    const login = (logInfos) => {
        setUser({ ...logInfos });
        localStorage.setItem('user', JSON.stringify({ ...logInfos }));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const getUserInfos = () => {
        return user;
    };

    return <UserContext.Provider value={{ login, getUserInfos, logout }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { UserProvider };
