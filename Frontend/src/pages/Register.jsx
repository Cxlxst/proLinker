import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/userContext.jsx';
import InfoInput from "../components/InfoInput";
import { axiosRequest } from '../libs/apiUtils.jsx';

export default function Register() {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    const submitRegister = async (values) => {
        try {
            const response = await axiosRequest({ method: 'POST', url: 'http://localhost:5000/api/auth/register', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values)});
            if (response.ok) {
                const data = await response.json();
                updateUser(data);
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

    return (
        <div className='w-full h-full'>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    birthdate: '',
                    password: ''
                }}
                onSubmit={submitRegister}
                validationSchema={Yup.object({
                    firstname: Yup.string().required('Champ requis'),
                    lastname: Yup.string().required('Champ requis'),
                    email: Yup.string().email('Adresse e-mail invalide').required('Champ requis'),
                    phone: Yup.string().matches(/^[0-9]+$/, "Doit contenir uniquement des chiffres").min(10, 'Doit contenir exactement 10 chiffres').max(10, 'Doit contenir exactement 10 chiffres').required('Champ requis'),
                    birthdate: Yup.date().required('Champ requis'),
                    password: Yup.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères').required('Champ requis')
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