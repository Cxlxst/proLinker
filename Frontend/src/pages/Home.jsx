import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  function login() {
    navigate("/connexion");
  }

  function register() {
    navigate("/inscription");
  }
    return (
        <BackgroundGradientAnimation>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl">
                <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                    Chaque CV a une histoire à raconter.<br /> Aidez-le à trouver son auditoire sur <b>ProLink</b>
                </p>
            </div>
            <button onClick={register} className="absolute z-50 cursor-pointer hover:bg-blue-500 hover:text-white p-3 rounded-lg transition duration-300" style={{ top: '50%', left: '45%', transform: 'translate(-50%, -50%)' }} >
                M'inscrire
            </button>
            <button onClick={login} className="absolute z-50 cursor-pointer hover:bg-blue-500 hover:text-white p-3 rounded-lg transition duration-300" style={{ top: '50%', left: '55%', transform: 'translate(-50%, -50%)' }} >
                Me connecter
            </button>
        </BackgroundGradientAnimation>
    );
}
