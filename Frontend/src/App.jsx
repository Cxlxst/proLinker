import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useContext } from "react";
import { Logo, LogoIcon, Sidebar, SidebarBody, SidebarLink } from "./components/ui/sidebar";
import { IconSettings, IconUserBolt, IconHome, IconLogout, IconFileCv, IconListSearch } from "@tabler/icons-react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ProtectedRoute from './context/protectedRoute';
import { UserContext } from './context/userContext';
import { cn } from "./libs/utils";
import './App.css'


import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Settings from './pages/Settings'
import CreateCv from './pages/CreateCv'
import EditCv from './pages/EditCv'
import AllCv from './pages/AllCv'
import Error404 from './pages/404'

function App() {
  const [open, setOpen] = useState(false);
  const { getUserInfos } = useContext(UserContext);
  const user = getUserInfos();

  const linksLog = [
    {
      label: "Accueil",
      href: "/",
      icon: (
        <IconHome className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Tous les CV",
      href: "/liste-cv",
      icon: (
        <IconListSearch className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Curriculum vitæ",
      href: "/modifier-mon-cv",
      icon: (
        <IconFileCv className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Paramètres",
      href: "/parametres",
      icon: (
        <IconSettings className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Déconnexion",
      href: "#",
      icon: (
        <IconLogout className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const linksNotLog = [
    {
      label: "Accueil",
      href: "/",
      icon: (
        <IconHome className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Tous les CV",
      href: "/liste-cv",
      icon: (
        <IconListSearch className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Curriculum vitæ",
      href: "/modifier-mon-cv",
      icon: (
        <IconFileCv className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Paramètres",
      href: "/parametres",
      icon: (
        <IconSettings className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Connexion",
      href: "/connexion",
      icon: (
        <IconUserBolt className="text-white h-5 w-5 flex-shrink-0" />
      ),
    },
  ];


  return (
    (
      <Router>
        <div
          className={cn(
            "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen h-screen flex-1 mx-auto overflow-hidden",
          )}>
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {open ? <Logo /> : <LogoIcon />}
                <div className="mt-8 flex flex-col gap-2">
                  {/* {links.map((link, idx) => (

                                        <SidebarLink key={idx} link={link} />
                                    ))} */}
                  {user ? (
                    <>
                      {linksLog.map((link, idx) => (
                        <SidebarLink key={idx} link={link} />
                      ))}
                    </>
                  ) : (
                    // si user connecté
                    <>
                      {linksNotLog.map((link, idx) => (
                        <SidebarLink key={idx} link={link} />
                      ))}
                    </>
                  )}
                </div>
              </div>
              {/* <div>
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
                            </div> */}
            </SidebarBody>
          </Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/creer-mon-cv" element={<ProtectedRoute><CreateCv /></ProtectedRoute>} />
            <Route path="/modifier-mon-cv" element={<ProtectedRoute><EditCv /></ProtectedRoute>} />
            <Route path="/liste-cv" element={<AllCv />} />
            <Route path="/parametres" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/404" element={<Error404 />} />
          </Routes>
        </div >
      </Router>
    )
  );
}

export default App
