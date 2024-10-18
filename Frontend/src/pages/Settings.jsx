import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/userContext.jsx';
import InfoInput from "../components/InfoInput";
import axios from 'axios';

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

export default function Settings() {
    const { user, updateUser } = useContext(UserContext);
    const [infoUserMore, setInfoUserMore] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${user.email}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setInfoUserMore(response.data);
            } catch (error) {
                console.error('Error fetching user information', error);
            }
        };
        fetchUserInfo();
    }, [user]);

    const submitSettings = async (values) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                const updatedUser = await response.json();
                updateUser(updatedUser);
                alert('Informations mises à jour avec succès');
                navigate('/parametres', { replace: true });
            } else {
                const errorData = await response.json();
                console.error(`Échec de la mise à jour:`, errorData);
                alert(`Échec de la mise à jour: ${errorData.message || "Erreur inconnue"}`);
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
            alert(`Erreur réseau: ${error.message}`);
        }
    }

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
                    newPassword: ''
                }}
                onSubmit={submitSettings}
                validationSchema={Yup.object({
                    firstname: Yup.string().required('Champ requis'),
                    lastname: Yup.string().required('Champ requis'),
                    email: Yup.string().email('Adresse e-mail invalide').required('Champ requis'),
                    phone: Yup.string().matches(/^[0-9]+$/, "Doit contenir uniquement des chiffres").min(10, 'Doit contenir exactement 10 chiffres').max(10, 'Doit contenir exactement 10 chiffres').required('Champ requis'),
                    birthdate: Yup.date().required('Champ requis'),
                    currentPassword: Yup.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères'),
                    newPassword: Yup.string().min(8, 'Le nouveau mot de passe doit comporter au moins 8 caractères')
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
                                        { name: 'birthdate', label: 'Date de naissance', type: 'date' }
                                    ]}
                                />
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
