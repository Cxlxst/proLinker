import React, { useEffect, useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import FieldArraySection from '../components/cv/FieldArraySection';
import SkillsSection from '../components/cv/SkillsSection';
import LanguagesSection from '../components/cv/LanguagesSection';
import InfoInput from '../components/cv/InfoInput';

function CreateCv() {
    const [jobTypes, setJobTypes] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [languageLevels, setLanguageLevels] = useState([]);
    const navigate = useNavigate()
    const bearer = useContext(UserContext).getUserInfos().token;

    const fetchData = async (url, setStateFunction) => {
        try {
            const response = await axios.get(url);
            setStateFunction(response.data);
        } catch (error) {
            console.error(`Error fetching data from ${url}`, error);
        }
    };

    useEffect(() => {
        fetchData('http://localhost:5000/api/job_types', setJobTypes);
        fetchData('http://localhost:5000/api/languages', setLanguages);
        fetchData('http://localhost:5000/api/levels', setLanguageLevels);
    }, []);

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
            const response = await fetch('http://localhost:5000/api/cvs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${bearer}`,
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                navigate('/', { replace: true });
            } else {
                const errorData = await response.json();
                console.error('Échec de l\'inscription:', errorData);
                alert(`Échec de l'inscription: ${errorData.message || 'Erreur inconnue'}`);
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
            alert(`Erreur réseau: ${error.message}`);
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
                    languages: [
                        { name: 'Anglais', level_name: "Débutant" }
                    ],
                    experiences: [
                        { name: '', beginning: '', end: '', current: false, structureName: '', description: '' },
                    ],
                    formations: [
                        { name: '', beginning: '', end: '', current: false, structureName: '', description: '' },
                    ],
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
                                    { name: 'profil', label: 'Profil', type: 'text' },
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
                            onClick={() => console.log(values)}
                            type="submit"
                            className="w-full text-white bg-purple-600 px-6 py-3 rounded hover:bg-purple-700 transition duration-300"
                        >
                            Submit CV
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateCv;