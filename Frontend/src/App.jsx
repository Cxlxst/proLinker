import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from "react";
import { Logo, LogoIcon, Sidebar, SidebarBody, SidebarLink } from "./components/ui/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { cn } from "./libs/utils";
import './App.css'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Settings from './pages/Settings'
import CreateCv from './pages/CreateCv'
import EditCv from './pages/EditCv'



function App() {
    const [open, setOpen] = useState(false);

    const links = [
        {
            label: "Accueil",
            href: "/",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Connexion",
            href: "/connexion",
            icon: (
                <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Paramètres",
            href: "/parametres",
            icon: (
                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Déconnexion",
            href: "#",
            icon: (
                <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];

    return (
        (
            <Router>
                <div
                    className={cn(
                        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen h-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                    )}>
                    <Sidebar open={open} setOpen={setOpen}>
                        <SidebarBody className="justify-between gap-10">
                            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                                {open ? <Logo /> : <LogoIcon />}
                                <div className="mt-8 flex flex-col gap-2">
                                    {links.map((link, idx) => (
                                        <SidebarLink key={idx} link={link} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <SidebarLink
                                    link={{
                                        label: "Manu Arora",
                                        href: "#",
                                        icon: (
                                            <LazyLoadImage
                                                src="https://assets.aceternity.com/manu.png"
                                                className="h-7 w-7 flex-shrink-0 rounded-full"
                                                width={50}
                                                height={50}
                                                alt="Avatar" />
                                        ),
                                    }} />
                            </div>
                        </SidebarBody>
                    </Sidebar>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/inscription" element={<Register />} />
                        <Route path="/connexion" element={<Login />} />
                        <Route path="/creer-mon-cv" element={<CreateCv />} />
                        <Route path="/modifier-mon-cv" element={<EditCv />} />
                        <Route path="/parametres" element={<Settings />} />
                    </Routes>
                </div >
            </Router>
        )
    );
}

export default App
