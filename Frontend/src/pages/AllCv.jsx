import axios from "axios";
import { useEffect, useState, useContext } from "react";
import eyeIcon from '../assets/eye.svg';
import { UserContext } from '../context/userContext';

export default function AllCv() {
    const [cvs, setCvs] = useState([]);

    const [likedCvs, setLikedCvs] = useState(() => {
        const initialState = {};
        cvs.forEach(cv => {
            initialState[cv._id] = false;
        });
        return initialState;
    });

    const toggleLike = (cvId) => {
        setLikedCvs((prevLikedCvs) => ({
            ...prevLikedCvs,
            [cvId]: !prevLikedCvs[cvId],
        }));
    };

    const bearer = useContext(UserContext).getUserInfos().token;

    useEffect(() => {
        const fetchCvs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cvs');
                setCvs(response.data);
                console.log(response.data);

            } catch (error) {
                console.error(`Error fetching data from cvs`, error);
            }
        };

        fetchCvs();
    }, []);

    async function addOrDelete(cvId, recommandation) {
        if (recommandation == true) {
            await deleteRecommandation(cvId);
        } else {
            await addRecommandation(cvId);
        }
        toggleLike(cvId);
    }
    async function addRecommandation(cvId) {
        try {
            const response = await fetch('http://localhost:5000/api/recommandations/add/' + cvId, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${bearer}`,
                }
            });
        } catch (error) {
            console.error(`Erreur dans la recommandation`, error);
        }
    };

    async function deleteRecommandation(cvId) {
        try {
            const response = await fetch('http://localhost:5000/api/recommandations/delete/' + cvId, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${bearer}`,
                }
            });
        } catch (error) {
            console.error(`Erreur dans la recommandation`, error);
        }
    };



    return (
        <div className="w-full h-full bg-[#151515] text-white p-4 flex flex-row flex-wrap justify-center space-x-32">
            {cvs.map((cv) => {
                // Séparer les expériences et les formations
                const experiences = cv.experiences.filter(exp => exp.type === "Experience");
                const formations = cv.experiences.filter(formation => formation.type === "Formation");

                return (
                    <div key={cv._id} className="mb-8 p-4 bg-[#1c1c1c] rounded-md shadow-md min-w-[350px] max-w-[350px] max-h-[450px]">
                        {/* <h2 className="text-2xl font-semibold mb-4">{cv.profil} - {cv.city}, {cv.region}</h2> */}

                        {/* Infos */}
                        <div className="ml-3">
                            <h2 className="text-2xl font-semibold">John DOE</h2>
                            <p className="">{cv.profil}</p>
                            {/* <p className="mt-8 max-w-[300px] mx-auto">“Passionnée par le design depuis toujours, j'adore transformer des idées en visuels percutants. Mon travail de graphiste me permet de jouer avec les couleurs, les formes, et de raconter des histoires visuelles uniques. J'aime aussi collaborer avec des équipes créatives et voir les projets prendre vie. Je recherche un environnement où je pourrais encore plus développer mon style et créer des expériences visuelles mémorables. Je suis prête à rejoindre une équipe ambitieuse pour réaliser de grands projets ensemble !“</p> */}
                        </div>

                        {/* Hard Skills */}
                        <div className="my-10 inline-block ml-3">
                            <h3 className="text-xl font-semibold">Compétences</h3>
                            <ul>
                                {cv.hard_skill.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="ml-3">
                            <h3 className="text-xl font-semibold">Soft Skills</h3>
                            <ul>
                                {cv.soft_skill.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Languages
                        <div className="mt-10 inline-block">
                            <h3 className="text-xl font-semibold">Languages</h3>
                            <ul>
                                {cv.languages.map((language, index) => (
                                    <li key={index}>
                                        {language.name} - {language.level}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Expériences
                        <div>
                            <h3 className="text-xl font-semibold">Expériences</h3>
                            <ul>
                                {experiences.map((exp, index) => (
                                    <li key={index} className="mt-2">
                                        <strong>{exp.name}</strong> à <strong>{exp.structureName}</strong> 
                                        <span> ({new Date(exp.beginning).toLocaleDateString()} - {exp.current ? "En cours" : new Date(exp.end).toLocaleDateString()})</span>
                                        <p>{exp.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Formations
                        <div>
                            <h3 className="text-xl font-semibold">Formations</h3>
                            <ul>
                                {formations.map((formation, index) => (
                                    <li key={index} className="mt-2">
                                        <strong>{formation.name}</strong> à <strong>{formation.structureName}</strong> 
                                        <span> ({new Date(formation.beginning).toLocaleDateString()} - {formation.current ? "En cours" : new Date(formation.end).toLocaleDateString()})</span>
                                        <p>{formation.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div> */}

                        {/* Bouton Like
                        <div className="flex-auto w-1/12">
                            {!cv.recommandation ? (
                                <button
                                    onClick={() => addOrDelete(cv._id, cv.recommandation)}
                                    className="p-3 rounded-full"
                                >
                                    <img src="./src/assets/unlike.svg" alt="Unlike" />
                                </button>
                            ) : (
                                <button
                                    onClick={() => addOrDelete(cv._id, cv.recommandation)}
                                    className="p-3 rounded-full"
                                >
                                    <img src="./src/assets/like.svg" alt="Like" />
                                </button>
                            )}
                        </div> */}
                        {/* Voir */}
                        <a href="#" className="mt-28 ml-[270px] w-10 h-10 bg-pink-500 hover:bg-pink-700 transition rounded-full flex items-center justify-center">
                            <img src={eyeIcon} />
                        </a>
                    </div>
                );
            })}
        </div>
    );
}
