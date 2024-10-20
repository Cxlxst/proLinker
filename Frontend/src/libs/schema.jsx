import * as Yup from 'yup';

export const SchemaCv = Yup.object().shape({
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
    visibility: Yup.boolean()
});