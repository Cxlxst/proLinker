import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";

export default function Home() {
    return (
        <BackgroundGradientAnimation interactive={false}>
                <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                    Chaque CV a une histoire à raconter.<br /> Aidez-le à trouver son auditoire sur <b>ProLink</b>
                </p>
                <button onClick={() => console.log('test')} className="cursor-pointer hover:bg-blue-500 hover:text-white p-3 rounded-lg transition duration-300">
                    M'inscrire
                </button>
            <div className="absolute z-[50000] inset-0 flex flex-col items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
            </div>
        </BackgroundGradientAnimation >
    )
}