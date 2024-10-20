import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState, useContext } from "react";
import { Logo, LogoIcon, Sidebar, SidebarBody, SidebarLink } from "./components/ui/sidebar";
import { IconSettings, IconUserBolt, IconHome, IconLogout, IconFileCv, IconListSearch } from "@tabler/icons-react";
import ProtectedRoute from './context/protectedRoute';
import { UserContext } from './context/UserContext.jsx';
import { cn } from "./libs/utils";
import './App.css';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Settings from './pages/Settings';
import CreateCv from './pages/CreateCv';
import EditCv from './pages/EditCv';
import AllCv from './pages/AllCv';
import CVDetails from './pages/Apercu';
import Error404 from './pages/404';
import { profilePictures } from './libs/apiUtils';

export default function App() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useContext(UserContext);

    const RedirectIfAuthenticated = ({ children }) => user ? <Navigate to="/" /> : children;

    const cvLink = user?.hasCV
        ? { label: "Modifier mon CV", href: "/modifier-mon-cv", icon: <IconFileCv className="text-white h-5 w-5" /> }
        : { label: "Créer mon CV", href: "/creer-mon-cv", icon: <IconFileCv className="text-white h-5 w-5" /> };

    const linksLog = [
        { label: "Accueil", href: "/", icon: <IconHome className="text-white h-5 w-5" /> },
        { label: "Tous les CV", href: "/liste-cv", icon: <IconListSearch className="text-white h-5 w-5" /> },
        cvLink,
        { label: "Paramètres", href: "/parametres", icon: <IconSettings className="text-white h-5 w-5" /> },
        { label: "Déconnexion", icon: <IconLogout className="text-white h-5 w-5" />, href: "/connexion", func: () => logout() }
    ];

    const linksNotLog = [
        { label: "Accueil", href: "/", icon: <IconHome className="text-white h-5 w-5" /> },
        { label: "Tous les CV", href: "/liste-cv", icon: <IconListSearch className="text-white h-5 w-5" /> },
        { label: "Connexion", href: "/connexion", icon: <IconUserBolt className="text-white h-5 w-5" /> }
    ];

    return (
        <Router>
            <div className={cn("flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen h-screen flex-1 mx-auto overflow-hidden")}>
                <Sidebar open={open} setOpen={setOpen}>
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-col flex-1 overflow-y-auto">
                            {open ? <Logo /> : <LogoIcon />}
                            <div className="mt-8 flex flex-col gap-2">
                                {(user ? linksLog : linksNotLog).map((link, idx) => <SidebarLink key={idx} link={link} />)}
                            </div>
                        </div>
                        {user && user.hasCV && (
                            <SidebarLink
                                link={{
                                    label: user.name,
                                    href: `/cv/${user._id}`,
                                    icon: <img src={profilePictures[user.ProfilePicture]?.image} alt="Profile Icon" className="w-6 h-6 rounded-full bg-white" />
                                }}
                            />
                        )}
                    </SidebarBody>
                </Sidebar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/inscription" element={<RedirectIfAuthenticated><Register /></RedirectIfAuthenticated>} />
                    <Route path="/connexion" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
                    <Route path="/creer-mon-cv" element={<ProtectedRoute><CreateCv /></ProtectedRoute>} />
                    <Route path="/modifier-mon-cv" element={<ProtectedRoute><EditCv /></ProtectedRoute>} />
                    <Route path="/liste-cv" element={<AllCv />} />
                    <Route path="/parametres" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                    <Route path="/cv/:id" element={<CVDetails />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
        </Router>
    );
}
