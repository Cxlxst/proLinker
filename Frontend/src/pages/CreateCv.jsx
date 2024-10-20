import React, { useEffect, useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import { UserContext } from '../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import FieldArraySection from '../components/cv/FieldArraySection';
import SkillsSection from '../components/cv/SkillsSection';
import LanguagesSection from '../components/cv/LanguagesSection';
import InfoInput from '../components/InfoInput';
import { axiosRequest } from '../libs/apiUtils';
import { SchemaCv } from '../libs/schema';

export default function CreateCv() {
    const [jobTypes, setJobTypes] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [languageLevels, setLanguageLevels] = useState([]);
    const { user, updateUser } = useContext(UserContext);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axiosRequest({ method: 'GET', url: `${apiUrl}/api/cvs/${user._id}`, headers: { Authorization: `Bearer ${user.token}` }, suppressErrorLog: true }).then(data => { if (data) {navigate('/modifier-mon-cv', { replace: true })}});
        axiosRequest({ method: 'GET', url: `${apiUrl}/api/job_types`, setStateFunction: setJobTypes });
        axiosRequest({ method: 'GET', url: `${apiUrl}/api/languages`, setStateFunction: setLanguages });
        axiosRequest({ method: 'GET', url: `${apiUrl}/api/levels`, setStateFunction: setLanguageLevels });
    }, [user, navigate]);

    const submitCV = async (values) => {
        try {
            await axiosRequest({ method: 'POST', url: `${apiUrl}/api/cvs/create`, data: values, headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' }});
            updateUser({...user, hasCV: true})
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Erreur lors de la création du CV:', error);
            alert(`Erreur lors de la création du CV: ${error.message || 'Erreur inconnue'}`);
        }
    };

    return (
        <div className="h-screen w-full bg-zinc-900 flex items-center justify-center overflow-hidden p-8">
            <Formik
                initialValues={{
                    region: '',
                    city: '',
                    visibility: true,
                    hard_skill: [],
                    soft_skill: [],
                    profil: '',
                    job_type_name: 'CDI',
                    languages: [{ name: 'Anglais', level_name: "Débutant" }],
                    experiences: [{ name: '', beginning: '', end: '', current: false, structureName: '', description: '' }],
                    formations: [{ name: '', beginning: '', end: '', current: false, structureName: '', description: '' }]
                }}
                validationSchema={SchemaCv}
                onSubmit={submitCV}
            >
                {({ values }) => (
                    <Form className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-4xl space-y-6 overflow-auto max-h-[calc(100vh-4rem)] mb-8">
                        <div className="grid grid-cols-2 gap-6">
                            <InfoInput
                                fields={[
                                    { name: 'city', label: 'Ville', type: 'text' },
                                    { name: 'region', label: 'Région', type: 'text' },
                                    { name: 'profil', label: 'Poste', type: 'text' },
                                    { name: 'job_type_name', label: 'Type d\'emploi', type: 'select', options: jobTypes },
                                ]}
                            />
                            <SkillsSection values={values} skillType="Hard Skills" fieldName="hard_skill" />
                            <SkillsSection values={values} skillType="Soft Skills" fieldName="soft_skill" />
                            <LanguagesSection values={values} languages={languages} levels={languageLevels} />
                            <FieldArraySection title="Experiences" fieldArrayName="experiences" values={values} />
                            <FieldArraySection title="Formations" fieldArrayName="formations" values={values} />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-pink-500 px-4 py-2 rounded hover:bg-pink-700 transition duration-300"
                        >
                            Ajouter mon CV
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}