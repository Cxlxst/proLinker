import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";
import { useNavigate } from "react-router-dom";

export default function Error404() {

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
            {/* <button onClick={home} className="absolute z-50 cursor-pointer hover:bg-pink-700 transition p-3 rounded-lg transition duration-300" style={{ top: '60%', left: '50%', transform: 'translate(-50%, -50%)' }} >
                Vers l'accueil
            </button> */}
            {/* <button onClick={home} className=" z-50 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
            Vers l'accueil
             </button> */}
             <div className="absolute z-50 flex space-x-6 mt-12" style={{ top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <button onClick={home} className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                        Vers l'accueil
                    </button>
                </div>
        </BackgroundGradientAnimation>
    );
}
