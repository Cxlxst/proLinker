import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/userContext.jsx';
import InfoInput from "../components/InfoInput";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const apiUrl = import.meta.env.VITE_API_URL;

    const submitLogin = async (values) => {
        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                const data = await response.json();
                login(data);
                navigate('/', { replace: true });
            } else {
                const errorData = await response.json();
                console.error('Échec de la connexion:', errorData);
                alert(`Échec de la connexion: ${errorData.message || "Erreur inconnue"}`);
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
                    email: '',
                    password: ''
                }}
                onSubmit={submitLogin}
                validationSchema={Yup.object({
                    email: Yup.string().email('Adresse e-mail invalide').required('Champ requis'),
                    password: Yup.string().required('Champ requis')
                })}>
                {({ isSubmitting }) => (
                    <Form className="flex flex-col items-center justify-center min-h-screen bg-[#151515] text-white">
                        <div className='w-full max-w-md p-8 space-y-4 bg-[#292929] rounded-lg shadow-lg'>
                            <InfoInput
                                    fields={[
                                        { name: 'email', label: 'E-mail', type: 'email' },
                                        { name: 'password', label: 'Mot de passe', type: 'password' },
                                    ]}
                                />
                            <button className="mt-3 w-full p-3 bg-pink-500 text-white rounded hover:bg-pink-700 transition duration-200 ease-in-out" type="submit" disabled={isSubmitting}>
                                Connexion
                            </button>
                            <div>
                                <p className="text-center">Vous n'avez pas encore de compte ?</p>
                                <a className="flex justify-center items-center" href="/inscription"><b className='transition hover:text-pink-700'>Inscrivez-vous</b></a>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}