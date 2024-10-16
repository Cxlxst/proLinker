import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  function home() {
    navigate("/");
  }

    return (
        <BackgroundGradientAnimation>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-white font-bold px-4 text-3xl text-center md:text-4xl lg:text-7xl">
                <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20" style={{ padding: '15%' }}>
                    Désolé cette page n'est pas accessible.<br /> On vous redirige ?
                </p>
            </div>
            <button onClick={home} className="absolute z-50 cursor-pointer hover:bg-pink-700 transition p-3 rounded-lg transition duration-300" style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }} >
                Vers l'accueil
            </button>
        </BackgroundGradientAnimation>
    );
}
