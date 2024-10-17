import React from 'react';
import { FieldArray, Field, ErrorMessage } from 'formik';

export default function LanguagesSection({ values, languages, levels }) {
    return (
        <FieldArray name="languages">
            {({ push, remove }) => (
                <div className="col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-400">Langues</label>
                    {values.languages.map((language, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div className="w-full">
                                <Field as="select" name={`languages[${index}].name`} className="form-select w-full p-2 text-gray-700 rounded">
                                    <option value="">Sélectionnez une langue</option>
                                    {languages.map((lang) => (
                                        <option key={lang._id} value={lang.name} selected={lang.name === values.languages[index].name}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name={`languages[${index}].name`} component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="w-full">
                                <Field as="select" name={`languages[${index}].level_name`} className="form-select w-full p-2 text-gray-700 rounded">
                                    <option value="">Sélectionnez un niveau</option>
                                    {levels.map((level_name) => (
                                        <option key={level_name._id} value={level_name.name} selected={level_name.name === values.languages[index].level_name}>
                                            {level_name.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name={`languages[${index}].level_name`} component="div" className="text-red-500 text-xs" />
                            </div>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="text-red-500 hover:text-red-700 transition duration-300"
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => push({ name: '', level_name: '' })}
                        className="text-white bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
                    >
                        Ajouter une langue
                    </button>
                </div>
            )}
        </FieldArray>
    );
}