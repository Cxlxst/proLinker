import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/userContext.jsx';
import InfoInput from "../components/InfoInput";
import { axiosRequest, formatDate, profilePictures } from '../libs/apiUtils';

export default function Settings() {
    const { user, updateUser } = useContext(UserContext);
    const [infoUserMore, setInfoUserMore] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showOptions, setShowOptions] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await axiosRequest({ method: 'GET', url: `http://localhost:5000/api/users/${user.email}`, headers: { 'Authorization': `Bearer ${user.token}` }, setStateFunction: setInfoUserMore });
            if (response) setSelectedImageIndex(response.profil_shrek_character || 0);
        };
        fetchUserInfo();
    }, []);

    const submitSettings = async (values) => {
        values.profil_shrek_character = selectedImageIndex;
        const response = await axiosRequest({ method: 'PUT', url: `http://localhost:5000/api/users/${user._id}`, data: values, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }});
        if (response) {
            updateUser(response);
            alert('Informations mises à jour avec succès');
            navigate('/parametres', { replace: true });
        } else {
            alert("Échec de la mise à jour");
        }
    };

    const handleImageSelect = (index) => {
        setSelectedImageIndex(index);
        setShowOptions(false);
    };

    if (!infoUserMore) {
        return <div className="text-white">Chargement des informations...</div>;
    }

    return (
        <div className='w-full h-full'>
            <Formik
                initialValues={{
                    firstname: infoUserMore.firstname || '',
                    lastname: infoUserMore.lastname || '',
                    email: infoUserMore.email || '',
                    phone: infoUserMore.phone || '',
                    birthdate: formatDate(infoUserMore.birthdate),
                    currentPassword: '',
                    newPassword: '',
                    profil_shrek_character: selectedImageIndex
                }}
                onSubmit={submitSettings}
                validationSchema={Yup.object({
                    firstname: Yup.string().required('Champ requis'),
                    lastname: Yup.string().required('Champ requis'),
                    email: Yup.string().email('Adresse e-mail invalide').required('Champ requis'),
                    phone: Yup.string().matches(/^[0-9]+$/, "Doit contenir uniquement des chiffres").min(10, 'Doit contenir exactement 10 chiffres').max(10, 'Doit contenir exactement 10 chiffres').required('Champ requis'),
                    birthdate: Yup.date().required('Champ requis').max(new Date(), 'La date de naissance doit être antérieure à aujourd\'hui'),
                    currentPassword: Yup.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères'),
                    newPassword: Yup.string().min(8, 'Le nouveau mot de passe doit comporter au moins 8 caractères'),
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
                                        { name: 'currentPassword', label: 'Mot de passe actuel', type: 'password' },
                                        { name: 'newPassword', label: 'Nouveau mot de passe', type: 'password' },
                                        { name: 'birthdate', label: 'Date de naissance', type: 'date' },
                                    ]}
                                />
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
                                                    <img key={index} src={picture.image} alt={`Profile ${index}`} className="w-12 h-12 bg-white rounded-full mb-2 cursor-pointer hover:bg-gray-700" onClick={() => handleImageSelect(index)}/>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button className="mt-3 w-full p-3 bg-pink-500 text-white rounded hover:bg-pink-700 transition duration-200 ease-in-out" type="submit" disabled={isSubmitting}>
                                Mettre à jour
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
