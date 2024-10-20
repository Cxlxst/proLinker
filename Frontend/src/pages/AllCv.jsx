import { useEffect, useState, useContext } from "react";
import eyeIcon from '../assets/eye.svg';
import likeIcon from '../assets/like.svg';
import unlikeIcon from '../assets/unlike.svg';
import { UserContext } from '../context/userContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { axiosRequest, calculateAge, profilePictures } from "../libs/apiUtils";
import { useNavigate } from "react-router-dom";

export default function AllCv() {
    const [cvs, setCvs] = useState(null), [likedCvs, setLikedCvs] = useState({}), [cvsSearched, setCvsSearched] = useState(null);
    const { user } = useContext(UserContext);
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('');

    const viewCVDetails = (cvId) => {
        navigate(`/cv/${cvId}`);
    };

    const userList = (list) => {
        if (list.users && list.users.length > 0) {
            return list.users.map((user) => `${user.firstname} ${user.lastname}<br>`).join('');
        } else if (list.message) {
            return list.message;
        }
        return "";
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


    const search = async () => {
        if (searchTerm !== "") {
            axiosRequest({ method: "GET", url: `http://localhost:5000/api/cvs/search/${searchTerm}`, setStateFunction: setCvs });
        } else {
            axiosRequest({ method: "GET", url: "http://localhost:5000/api/cvs", setStateFunction: setCvs });
        }
    }


    return !cvs ? (
        <div className="text-white">Chargement des CV...</div>
    ) : (
        <div className="w-full h-screen bg-[#151515] text-white p-4 flex flex-col overflow-y-auto">
            {/* Search input */}
            <div className="mb-3 xl:w-96">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <input
                        type="search"
                        className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon2"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <span
                        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                        id="basic-addon2" onClick={search}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
            </div>

            {/* CV Cards */}
            <div className="flex flex-wrap justify-center gap-10 overflow-y-auto h-[80vh]"> {/* Added overflow here */}
                {cvs.map((cv, index) => {
                    const age = calculateAge(cv.user_id.birthdate), isLiked = likedCvs[cv._id];
                    return (
                        <div key={cv._id} className="relative mb-8 p-4 bg-[#1c1c1c] rounded-md shadow-md w-[400px] max-h-[450px] flex flex-col justify-between overflow-hidden">
                            <div>
                                <div className="flex items-center ml-3">
                                    <img
                                        src={profilePictures[cv.user_id.profil_shrek_character].image || profilePictures[0].image}
                                        alt="Profile"
                                        className="bg-white w-12 h-12 rounded-full mr-3"
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
                            <a href="" onClick={(e) => { e.preventDefault(); viewCVDetails(cv.user_id._id) }} className="absolute bottom-4 right-4 w-10 h-10 bg-pink-500 hover:bg-pink-700 transition rounded-full flex items-center justify-center">
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
                                    <div className="flex justify-center">
                                        {cv.usersRecommandation.users && (
                                            <p id="tooltip-user" data-tooltip-content={userList(cv.usersRecommandation)} data-html={true}>
                                                {cv.usersRecommandation.users.length}
                                            </p>
                                        )}
                                        {cv.usersRecommandation.message && (
                                            <p id="tooltip-user" data-tooltip-content={userList(cv.usersRecommandation)} data-html={true}>
                                                0
                                            </p>
                                        )}
                                        <Tooltip anchorSelect="#tooltip-user" data-html={true} />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
