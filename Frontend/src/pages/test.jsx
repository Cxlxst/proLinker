import shrek from '../assets/shrek.webp';

export default function Test() {
    return (
        <>
            <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
                <div>
                    <img src={shrek} alt="Description" />
                </div>
            </div>
        </>
    )
}
