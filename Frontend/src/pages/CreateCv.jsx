import React, { useEffect, useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import FieldArraySection from '../components/cv/FieldArraySection';
import SkillsSection from '../components/cv/SkillsSection';
import LanguagesSection from '../components/cv/LanguagesSection';
import InfoInput from '../components/InfoInput';

export default function CreateCv() {
    const [jobTypes, setJobTypes] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [languageLevels, setLanguageLevels] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const axiosRequest = async ({ method, url, setStateFunction = null, data = null, headers = null, suppressErrorLog = false }) => {
        try {
            const config = { method, url, headers, data };
            const response = await axios(config);
            if (setStateFunction !== null) setStateFunction(response.data);
            return response.data;
        } catch (error) {
            if (!suppressErrorLog) console.error(`Error in Axios request to ${url}`, error.response || error);
            return null;
        }
    };

    useEffect(() => {
        axiosRequest({ method: 'GET', url: `http://localhost:5000/api/cvs/${user._id}`, headers: { Authorization: `Bearer ${user.token}` }, suppressErrorLog: true }).then(data => { if (data) {navigate('/modifier-mon-cv', { replace: true })}});
        axiosRequest({ method: 'GET', url: 'http://localhost:5000/api/job_types', setStateFunction: setJobTypes });
        axiosRequest({ method: 'GET', url: 'http://localhost:5000/api/languages', setStateFunction: setLanguages });
        axiosRequest({ method: 'GET', url: 'http://localhost:5000/api/levels', setStateFunction: setLanguageLevels });
    }, [user, navigate]);

    const validationSchema = Yup.object().shape({
        city: Yup.string().required('Champ requis'),
        region: Yup.string().required('Champ requis'),
        profil: Yup.string().required('Champ requis'),
        job_type_name: Yup.string(),
        hard_skill: Yup.array().of(Yup.string().required('Compétence requise')),
        soft_skill: Yup.array().of(Yup.string().required('Compétence requise')),
        languages: Yup.array().of(
            Yup.object({
                name: Yup.string(),
                level_name: Yup.string(),
            })
        ),
        experiences: Yup.array().of(
            Yup.object({
                name: Yup.string().required('Intitulé du poste requis'),
                beginning: Yup.date().required('Date de début requise'),
                end: Yup.date().required('Date de fin requise'),
                current: Yup.boolean(),
                structureName: Yup.string().required(`Nom de l'entreprise requis`),
                description: Yup.string(),
            })
        ),
        formations: Yup.array().of(
            Yup.object({
                name: Yup.string().required('Intitulé de la formation requis'),
                beginning: Yup.date().required('Date de début requise'),
                end: Yup.date().required('Date de fin requise'),
                current: Yup.boolean(),
                structureName: Yup.string().required(`Nom de l'établissement requis`),
                description: Yup.string(),
            })
        ),
    });

    const submitCV = async (values) => {
        try {
            await axiosRequest({ method: 'POST', url: 'http://localhost:5000/api/cvs/create', data: values, headers: { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' }});
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
                validationSchema={validationSchema}
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