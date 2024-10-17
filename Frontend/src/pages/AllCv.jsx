import axios from "axios";
import { useEffect, useState } from "react";

export default function AllCv() {
    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        const fetchCvs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cvs');
                setCvs(response.data);
            } catch (error) {
                console.error(`Error fetching data from cvs`, error);
            }
        };

        fetchCvs();
    }, []);

    return (
        <div className="w-full h-full bg-[#151515] text-white p-4">
            {cvs.map((cv) => {
                // Séparer les expériences et les formations
                const experiences = cv.experiences.filter(exp => exp.type === "Experience");
                const formations = cv.experiences.filter(formation => formation.type === "Formation");

                return (
                    <div key={cv._id} className="mb-8 p-4 bg-[#1c1c1c] rounded-md shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">{cv.profil} - {cv.city}, {cv.region}</h2>
                        
                        {/* Hard Skills */}
                        <div>
                            <h3 className="text-xl font-semibold">Hard Skills</h3>
                            <ul>
                                {cv.hard_skill.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Soft Skills */}
                        <div>
                            <h3 className="text-xl font-semibold">Soft Skills</h3>
                            <ul>
                                {cv.soft_skill.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Languages */}
                        <div>
                            <h3 className="text-xl font-semibold">Languages</h3>
                            <ul>
                                {cv.languages.map((language, index) => (
                                    <li key={index}>
                                        {language.language} - {language.level}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Expériences */}
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

                        {/* Formations */}
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
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
