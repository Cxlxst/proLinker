import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/userContext.jsx';

function Register() {
    const navigate = useNavigate();
    const { register } = useContext(UserContext);

    const submitRegister = async (values) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                const data = await response.json();
                register(data);
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
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    birthDate: '',
                    password: ''
                }}
                onSubmit={submitRegister}
                validationSchema={Yup.object({
                    firstName: Yup.string().required('Champ requis'),
                    lastName: Yup.string().required('Champ requis'),
                    email: Yup.string().email('Adresse e-mail invalide').required('Champ requis'),
                    phoneNumber: Yup.string().matches(/^[0-9]+$/, "Doit contenir uniquement des chiffres").min(10, 'Doit contenir exactement 10 chiffres').max(10, 'Doit contenir exactement 10 chiffres').required('Champ requis'),
                    birthDate: Yup.date().required('Champ requis'),
                    password: Yup.string().min(8, 'Le mot de passe doit comporter au moins 8 caractères').required('Champ requis')
                })}>
                {({ isSubmitting }) => (
                    <Form className="flex flex-col items-center justify-center min-h-screen bg-[#151515] text-white">
                        <div className='w-full max-w-lg p-8 space-y-4 bg-[#292929] rounded-lg shadow-lg'>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label htmlFor="firstName" className="block mb-1 font-bold">Prénom</label>
                                    <Field className="w-full p-2 text-white rounded outline-none transition-all hover:transition-all hover:ring-2 hover:ring-orange-500 focus:ring-2 focus:ring-orange-500 bg-stone-900" type="text" name="firstName" />
                                    <ErrorMessage className="text-red-500 text-xs" name="firstName" component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName" className="block mb-1 font-bold">Nom</label>
                                    <Field className="w-full p-2 text-white rounded outline-none transition-all hover:transition-all hover:ring-2 hover:ring-orange-500 focus:ring-2 focus:ring-orange-500 bg-stone-900" type="text" name="lastName" />
                                    <ErrorMessage className="text-red-500 text-xs" name="lastName" component="div" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label htmlFor="email" className="block mb-1 font-bold">E-mail</label>
                                    <Field className="w-full p-2 text-white rounded outline-none transition-all hover:transition-all hover:ring-2 hover:ring-orange-500 focus:ring-2 focus:ring-orange-500 bg-stone-900" type="email" name="email" />
                                    <ErrorMessage className="text-red-500 text-xs" name="email" component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phoneNumber" className="block mb-1 font-bold">Numéro de téléphone</label>
                                    <Field className="w-full p-2 text-white rounded outline-none transition-all hover:transition-all hover:ring-2 hover:ring-orange-500 focus:ring-2 focus:ring-orange-500 bg-stone-900" type="tel" name="phoneNumber" />
                                    <ErrorMessage className="text-red-500 text-xs" name="phoneNumber" component="div" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-group">
                                    <label htmlFor="birthDate" className="block mb-1 font-bold">Date de naissance</label>
                                    <Field className="w-full p-2 text-white rounded outline-none transition-all hover:transition-all hover:ring-2 hover:ring-orange-500 focus:ring-2 focus:ring-orange-500 bg-stone-900" type="date" name="birthDate" />
                                    <ErrorMessage className="text-red-500 text-xs" name="birthDate" component="div" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="block mb-1 font-bold">Mot de passe</label>
                                    <Field className="w-full p-2 text-white rounded outline-none transition-all hover:transition-all hover:ring-2 hover:ring-orange-500 focus:ring-2 focus:ring-orange-500 bg-stone-900" type="password" name="password" />
                                    <ErrorMessage className="text-red-500 text-xs" name="password" component="div" />
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

export default Register;
