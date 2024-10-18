import React from 'react';
import { FieldArray } from 'formik';
import InfoInput from '../InfoInput';

export default function FieldArraySection({ title, fieldArrayName, values }) {
    return (
        <FieldArray name={fieldArrayName}>
            {({ push, remove }) => (
                <div className="col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-white">{title}</label>
                    {values[fieldArrayName].map((item, index) => (
                        <div key={index} className="flex flex-col space-y-2">
                            <div className="grid grid-cols-2 gap-6">
                                <InfoInput
                                    fields={[
                                        { name: `${fieldArrayName}[${index}].structureName`, label: "Nom de l'entreprise", type: "text" },
                                        { name: `${fieldArrayName}[${index}].name`, label: "Poste", type: "text" },
                                        { name: `${fieldArrayName}[${index}].beginning`, label: "Date de début", type: "date" },
                                        { name: `${fieldArrayName}[${index}].end`, label: "Date de fin", type: "date" },
                                        { name: `${fieldArrayName}[${index}].current`, label: "En cours", type: "checkbox" },
                                        { name: `${fieldArrayName}[${index}].description`, label: "Description", type: "textarea" },
                                    ]}
                                />
                            </div>
                            <button type="button" onClick={() => remove(index)} className="text-white bg-red-700 hover:bg-red-900 mt-2">
                                Supprimer
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => push({ name: '', beginning: '', end: '', current: false, structureName: '', description: '' })}
                        className="text-white bg-pink-500 px-4 py-2 rounded hover:bg-pink-700 transition duration-300"
                    >
                        Ajouter une expérience
                    </button>
                </div>
            )}
        </FieldArray>
    );
}