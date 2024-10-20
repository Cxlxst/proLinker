import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext';
import { axiosRequest, calculateAge, formatDate, profilePictures } from "../libs/apiUtils";
import 'react-tooltip/dist/react-tooltip.css';
import arrow from '../assets/arrow.svg';

export default function CVDetails() {
    const [cv, setCv] = useState(null);
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axiosRequest({ method: "GET", url: `http://localhost:5000/api/cvs/${id}`, setStateFunction: setCv });
    }, [id]);

    if (!cv) {
        return <div className="text-white">Chargement des informations du CV...</div>;
    }

    const age = calculateAge(cv.user_id.birthdate);

    return (
        <div className="w-full h-full bg-[#151515] text-white p-8 flex flex-col items-center overflow-y-auto">
            {/* Header section with profile picture and basic info */}
            <div className="flex w-full justify-between mb-8 bg-[#1c1c1c] p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                    <img 
                        src={profilePictures[cv.user_id.profil_shrek_character]?.image || profilePictures[0].image} 
                        alt="Profile" 
                        className="bg-white w-32 h-32 rounded-full mr-6"
                    />
                    <div>
                        <h1 className="text-4xl font-bold">{cv.user_id.firstname} {cv.user_id.lastname}</h1>
                        <p className="text-lg text-gray-400">Âge : {age} ans</p>
                        <p className="mt-2">{cv.profil}</p>
                    </div>
                </div>
                <button onClick={() => navigate(-1)} className="p-3 bg-pink-500 rounded-full hover:bg-pink-700 transition h-12">
                    <img src={arrow} alt="Retour" className="w-6 h-6" />
                </button>
            </div>

            {/* Main CV content */}
            <div className="w-full max-w-4xl bg-[#1c1c1c] p-6 rounded-lg shadow-lg space-y-8 max-h-[70vh] overflow-y-auto">
                {/* Hard Skills */}
                <div>
                    <h2 className="text-2xl font-semibold">Compétences Techniques (Hard Skills)</h2>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {cv.hard_skill.map((hard, i) => (
                            <span key={i} className="bg-gray-700 px-3 py-2 rounded-full text-sm">{hard}</span>
                        ))}
                    </div>
                </div>

                {/* Soft Skills */}
                <div>
                    <h2 className="text-2xl font-semibold">Compétences Personnelles (Soft Skills)</h2>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {cv.soft_skill.map((soft, i) => (
                            <span key={i} className="bg-gray-700 px-3 py-2 rounded-full text-sm">{soft}</span>
                        ))}
                    </div>
                </div>

                {/* Experiences */}
                <div>
                    <h2 className="text-2xl font-semibold">Expériences Professionnelles</h2>
                    <div className="space-y-4 mt-4">
                        {cv.experiences.filter(exp => exp.type === 'Experience').map((exp, i) => (
                            <div key={i} className="bg-[#151515] p-4 rounded-lg" style={{ boxShadow: 'inset 0 0 10px 2px #F86F18' }}>
                                <h3 className="text-xl font-bold">{exp.name} <span className="text-gray-400">({exp.structureName})</span></h3>
                                <p className="text-gray-400 text-sm">De {formatDate(exp.beginning)} à {formatDate(exp.end) || 'Aujourd\'hui'}</p>
                                <p className="mt-2">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Formations */}
                <div>
                    <h2 className="text-2xl font-semibold">Formations</h2>
                    <div className="space-y-4 mt-4">
                        {cv.experiences.filter(exp => exp.type === 'Formation').map((formation, i) => (
                            <div key={i} className="bg-[#151515] p-4 rounded-lg" style={{ boxShadow: 'inset 0 0 10px 2px #F86F18' }}>
                                <h3 className="text-xl font-bold">{formation.name} <span className="text-gray-400">({formation.structureName})</span></h3>
                                <p className="text-gray-400 text-sm">De {formatDate(formation.beginning)} à {formatDate(formation.end)}</p>
                                <p className="mt-2">{formation.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Language Skills (if any) */}
                {cv.languages && (
                    <div>
                        <h2 className="text-2xl font-semibold">Compétences Linguistiques</h2>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {cv.languages.map((lang, i) => (
                                <span key={i} className="bg-gray-700 px-3 py-2 rounded-full text-sm">{lang.name} - {lang.level_name}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Contact Info */}
                <h2 className="text-2xl font-semibold">Contact</h2>
                <div className="bg-[#151515] p-4 rounded-lg" style={{ boxShadow: 'inset 0 0 10px 2px #F86F18', marginTop: '15px' }}>
                    <p><strong>Email :</strong> {cv.user_id.email}</p>
                    <p className="mt-2"><strong>Téléphone :</strong> {cv.user_id.phone}</p>
                </div>
            </div>
        </div>
    );
}
