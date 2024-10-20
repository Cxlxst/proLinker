import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/userContext.jsx';
import InfoInput from "../components/InfoInput";
import { axiosRequest, profilePictures } from '../libs/apiUtils.jsx';

export default function Register() {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showOptions, setShowOptions] = useState(false); 

    const submitRegister = async (values) => {
        try {
            values.profil_shrek_character = selectedImageIndex;
            const response = await axiosRequest({ method: 'POST', url: 'http://localhost:5000/api/auth/register', headers: { 'Content-Type': 'application/json' }, data: JSON.stringify(values) });
            if (response) {
                updateUser(response);
                navigate('/', { replace: true });
            } else {
                const errorData = await response.json();
                console.error(`Échec de l'inscription:`, errorData);
                alert(`Échec de l'inscription: ${errorData.message || "Erreur inconnue"}`);
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
            alert(`Erreur réseau: ${error.message}`);
        }
    }

    const handleImageSelect = (index) => {
        setSelectedImageIndex(index);
        setShowOptions(false);
    };

    return (
        <div className='w-full h-full'>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    birthdate: '',
                    password: '',
                    profil_shrek_character: 0
                }}
                onSubmit={submitRegister}
                validationSchema={Yup.object({
                    firstname: Yup.string().required('Champ requis'),
                    lastname: Yup.string().required('Champ requis'),
                    email: Yup.string().email('Adresse e-mail invalide').required('Champ requis'),
                    phone: Yup.string().matches(/^[0-9]+$/, "Doit contenir uniquement des chiffres").min(10, 'Doit contenir exactement 10 chiffres').max(10, 'Doit contenir exactement 10 chiffres').required('Champ requis'),
                    birthdate: Yup.date().required('Champ requis'),
                    password: Yup.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères').required('Champ requis'),
                    profil_shrek_character: Yup.number()
                })}>
                {({ isSubmitting }) => (
                    <Form className="flex flex-col items-center justify-center min-h-screen bg-[#151515] text-white">
                        <div className='w-full max-w-lg p-8 space-y-4 bg-[#292929] rounded-lg shadow-lg'>
                            <div className="grid grid-cols-2 gap-4">
                                <InfoInput
                                    fields={[
                                        { name: 'firstname', label: 'Prénom', type: 'text' },
                                        { name: 'lastname', label: 'Nom', type: 'text' },
                                        { name: 'email', label: 'E-mail', type: 'email' },
                                        { name: 'phone', label: 'Numéro de téléphone', type: 'tel' },
                                        { name: `birthdate`, label: "Date de naissance", type: "date" },
                                        { name: 'password', label: 'Mot de passe', type: 'password' },
                                    ]}
                                />
                            </div>
                            <div className="flex flex-row space-y-4">
                                <label className="flex items-center p-2 justify-center text-sm font-semibold text-white">Photo de profil: </label>
                                <div className="relative">
                                    <img
                                        src={profilePictures[selectedImageIndex].image}
                                        alt="Profile Preview"
                                        className="w-16 h-16 rounded-full cursor-pointer bg-white"
                                        onClick={() => setShowOptions(!showOptions)}
                                    />
                                    {showOptions && (
                                        <div className="absolute z-10 flex flex-col mt-2 bg-gray-800 p-2 rounded-md shadow-lg overflow-y-auto max-h-[200px]">
                                            {profilePictures.map((picture, index) => (
                                                <img key={index} src={picture.image} alt={`Profile ${index}`} className="w-12 h-12 bg-white rounded-full mb-2 cursor-pointer hover:bg-gray-700" onClick={() => handleImageSelect(index)} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="mt-3 w-full p-3 bg-pink-500 text-white rounded hover:bg-pink-700 transition duration-200 ease-in-out" type="submit" disabled={isSubmitting}>
                                S'inscrire
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}