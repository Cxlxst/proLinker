import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../context/userContext.jsx';

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const submitLogin = async (values) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
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
                            <div>
                                <label htmlFor="email" className="block mb-1 font-bold">E-mail</label>
                                <Field className="w-full p-2 text-white rounded outline-none transition-all hover:transition-all hover:ring-2 hover:ring-orange-500 focus:ring-2 focus:ring-orange-500 bg-stone-900" type="email" name="email" />
                                <ErrorMessage className="text-red-500 text-xs" name="email" component="div" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-1 font-bold">Mot de passe</label>
                                <Field className="w-full p-2 text-white rounded outline-none transition-all hover:transition-all hover:ring-2 hover:ring-orange-500 focus:ring-2 focus:ring-orange-500 bg-stone-900" type="password" name="password" />
                                <ErrorMessage className="text-red-500 text-xs" name="password" component="div" />
                            </div>
                            <button className="mt-3 w-full p-3 bg-pink-500 text-white rounded hover:bg-pink-700 transition duration-200 ease-in-out" type="submit" disabled={isSubmitting}>
                                Connexion
                            </button>
                            <div>
                                <p className="text-center">Vous n'avez pas encore de compte ?</p>
                                <a className="flex justify-center items-center" href="/inscription"><b>Inscrivez-vous</b></a>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;