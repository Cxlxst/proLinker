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

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

export default function EditCv() {
    const { user } = useContext(UserContext);
    const [cvData, setCvData] = useState(null);
    const [jobTypes, setJobTypes] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [languageLevels, setLanguageLevels] = useState([]);
    const navigate = useNavigate();

    const axiosRequest = async ({ method, url, setStateFunction = null, data = null, headers = null }) => {
        try {
            const config = { method, url, headers, data };
            const response = await axios(config);
            if (setStateFunction !== null) setStateFunction(response.data);
            return response.data;
        } catch (error) {
            if (setStateFunction === setCvData) { navigate("/creer-mon-cv") }
            console.error(`Error in Axios request to ${url}`, error.response || error);
            throw error.response || error;
        }
    };

    useEffect(() => {
        axiosRequest({ method: 'GET', url: `http://localhost:5000/api/cvs/${user._id}`, headers: { Authorization: `Bearer ${user.token}` }, setStateFunction: setCvData });
        axiosRequest({ method: 'GET', url: 'http://localhost:5000/api/job_types', setStateFunction: setJobTypes });
        axiosRequest({ method: 'GET', url: 'http://localhost:5000/api/languages', setStateFunction: setLanguages });
        axiosRequest({ method: 'GET', url: 'http://localhost:5000/api/levels', setStateFunction: setLanguageLevels });
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
            await axiosRequest({ method: 'PUT', url: `http://localhost:5000/api/cvs/${cvData._id}`, data: values, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` } });
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du CV:', error);
            alert(`Erreur lors de la mise à jour du CV: ${error.message || 'Erreur inconnue'}`);
        }
    };

    if (!cvData) {
        return <div className="text-white">Chargement du CV...</div>;
    }

    const experiences = cvData.experiences.filter((exp) => exp.type === 'Experience');
    const formations = cvData.experiences.filter((exp) => exp.type === 'Formation');

    return (
        <div className="h-screen w-full bg-zinc-900 flex items-center justify-center overflow-hidden p-8">
            <Formik
                initialValues={{
                    region: cvData.region || '',
                    city: cvData.city || '',
                    visibility: cvData.visibility || true,
                    hard_skill: cvData.hard_skill || [],
                    soft_skill: cvData.soft_skill || [],
                    profil: cvData.profil || '',
                    job_type_name: cvData.job_type_id?.name || 'CDI',
                    languages: cvData.languages || [{ name: 'Anglais', level_name: 'Débutant' }],
                    experiences: experiences.map(exp => ({ ...exp, beginning: formatDate(exp.beginning), end: formatDate(exp.end) })),
                    formations: formations.map(formation => ({ ...formation, beginning: formatDate(formation.beginning), end: formatDate(formation.end) })),
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
                                    { name: 'job_type_name', label: 'Type d\'emploi', type: 'select', options: jobTypes }]}
                            />
                            <SkillsSection values={values} skillType="Hard Skills" fieldName="hard_skill" />
                            <SkillsSection values={values} skillType="Soft Skills" fieldName="soft_skill" />
                            <LanguagesSection values={values} languages={languages} levels={languageLevels} />
                            <FieldArraySection title="Experiences" fieldArrayName="experiences" values={values} />
                            <FieldArraySection title="Formations" fieldArrayName="formations" values={values} />
                        </div>
                        <button type="submit" className="w-full text-white bg-purple-600 px-6 py-3 rounded hover:bg-purple-700 transition duration-300">Mettre à jour le CV</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}