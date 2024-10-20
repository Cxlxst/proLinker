import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../context/UserContext.jsx';

export default function Home() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);  // Récupérer l'état de l'utilisateur connecté

    function login() {
        navigate("/connexion");
    }

    function register() {
        navigate("/inscription");
    }

    function allCV() {
        navigate("/liste-cv");
    }
    return (
        <BackgroundGradientAnimation>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl">
                <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 py-8 md:py-12">
                    Chaque CV a une histoire à raconter.<br /> Aidez-le à trouver son auditoire sur <b>ProLink</b>
                </p>
            </div>

            {/* Si l'utilisateur n'est pas connecté, afficher les boutons */}
            {!user ? (
                <div className="absolute z-50 flex space-x-6 mt-12" style={{ top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <button onClick={register} className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                        M'inscrire
                    </button>
                    <button onClick={login} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                        Me connecter
                    </button>
                </div>
            ) : (
                <div className="absolute z-50 flex space-x-6 mt-12" style={{ top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <button onClick={allCV} className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                        Découvrir les CVs
                    </button>
                </div>
            )}
        </BackgroundGradientAnimation>
    );
}
