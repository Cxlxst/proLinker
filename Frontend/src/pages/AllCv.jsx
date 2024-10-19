import axios from "axios";
import { useEffect, useState, useContext } from "react";
import eyeIcon from '../assets/eye.svg';
import likeIcon from '../assets/like.svg';
import unlikeIcon from '../assets/unlike.svg';
import pp1 from '../assets/shrek/pp1.svg';
import { UserContext } from '../context/userContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const calculateAge = (birthdate) => {
    const today = new Date(), birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    return monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
};

export default function AllCv() {
    const [cvs, setCvs] = useState(null), [likedCvs, setLikedCvs] = useState({});
    const { user } = useContext(UserContext);

    const userList = (list) =>{
        console.log(list);
        let test =list.map((user, index) => `${user.firstname} ${user.lastname}<br>`).join('');
        console.log(test);
        return test;
    }

    const profilePictures = [pp1];

    const axiosRequest = async ({ method, url, data = null, headers = null, setStateFunction = null, liked = null }) => {
        try {
            const config = { method, url, headers, data };
            const response = await axios(config);
            if (liked !== null) {
                const transformedData = response.data.reduce((acc, el) => { acc[el._id] = true; return acc; }, {});
                if (setStateFunction !== null) setStateFunction(transformedData);
                console.log(response.data);
                return transformedData;
            } else {
                if (setStateFunction !== null) setStateFunction(response.data);
                console.log(response.data);
                return response.data;
            }
        } catch (error) {
            console.error(`Axios Error: ${error.response?.status || 'Unknown'}`, error.response?.data || error.message);
            throw error;
        }
    };

    const toggleLike = async (cvId) => {
        if (!user) return;
        const isLiked = likedCvs[cvId];
        try {
            await axiosRequest({ method: 'GET', url: `http://localhost:5000/api/recommandations/${isLiked ? 'delete' : 'add'}/${cvId}`, headers: { Authorization: `Bearer ${user.token}` } });
            setLikedCvs(prev => ({ ...prev, [cvId]: !isLiked }));
        } catch (error) {
            console.error("Erreur lors de la modification de recommandation", error);
        }
    };

    useEffect(() => {
        axiosRequest({ method: "GET", url: "http://localhost:5000/api/cvs", setStateFunction: setCvs });
        if (user) axiosRequest({ method: "GET", url: "http://localhost:5000/api/recommandations/allrecoFromUser", headers: { Authorization: `Bearer ${user.token}` }, setStateFunction: setLikedCvs, liked: true });
    }, [user]);

    return !cvs ? (
        <div className="text-white">Chargement des CV...</div>
    ) : (
        <div className="w-full h-full bg-[#151515] text-white p-4 flex flex-row flex-wrap justify-center gap-10">
            {cvs.map((cv, index) => {
                const age = calculateAge(cv.user_id.birthdate), isLiked = likedCvs[cv._id];
                return (
                    <div key={cv._id} className="relative mb-8 p-4 bg-[#1c1c1c] rounded-md shadow-md w-[400px] max-h-[450px] flex flex-col justify-between">
                        <div>
                            <div className="flex items-center ml-3">
                                <img
                                    src={profilePictures[cv.user_id.profil_shrek_character] || profilePictures[0]}
                                    alt="Profile"
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <div>
                                    <h2 className="text-2xl font-semibold">{cv.user_id.firstname} {cv.user_id.lastname}</h2>
                                    <p className="text-sm text-gray-400">Âge : {age} ans</p>
                                    <p className="">{cv.profil}</p>
                                </div>
                            </div>
                            <div className="m-3">
                                <h3 className="text-xl font-semibold">Hard Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cv.hard_skill.slice(0, 6).map((hard, i) => (
                                        <span key={i} className="bg-gray-700 px-2 py-1 rounded">{hard}</span>
                                    ))}
                                    {cv.hard_skill.length > 6 && <span>... </span>}
                                </div>
                            </div>
                            <div className="m-3">
                                <h3 className="text-xl font-semibold">Soft Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cv.soft_skill.slice(0, 6).map((skill, i) => (
                                        <span key={i} className="bg-gray-700 px-2 py-1 rounded">{skill}</span>
                                    ))}
                                    {cv.soft_skill.length > 6 && <span>... </span>}
                                </div>
                            </div>
                        </div>
                        <a href="#" className="absolute bottom-4 right-4 w-10 h-10 bg-pink-500 hover:bg-pink-700 transition rounded-full flex items-center justify-center">
                            <img src={eyeIcon} alt="Voir plus" />
                        </a>
                        {user && (
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={() => toggleLike(cv._id)}
                                    className={`p-2 rounded-full ${isLiked ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-pink-500 transition`}
                                >
                                    <img src={isLiked ? likeIcon : unlikeIcon} alt={isLiked ? "Like" : "Unlike"} className="w-6 h-6" />
                                </button>
                                {/* <div>
                                    {cv.}
                                </div> */}
                                <div className="flex justify-center">
                                    <p id="tooltip-user" data-tooltip-content={userList(cv.usersRecommandation.users)} data-html={true}>
                                        {cv.usersRecommandation.users.length}
                                    </p>
                                    <Tooltip anchorSelect="#tooltip-user" data-html={true} />
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
