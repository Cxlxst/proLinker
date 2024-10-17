import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Initialisation avec les données du localStorage
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Fonction de connexion, enregistre les infos dans le contexte et localStorage
    const login = (logInfos) => {
        setUser(logInfos);
        localStorage.setItem('user', JSON.stringify(logInfos));
    };

    // Fonction de déconnexion, réinitialise le contexte et supprime le localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Retourne les informations utilisateur actuelles
    const getUserInfos = () => user;

    return (
        <UserContext.Provider value={{ user, login, logout, getUserInfos }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { UserProvider };
