import React from 'react';
import { FieldArray, Field, ErrorMessage } from 'formik';

function LanguagesSection({ values, languages, levels }) {
    return (
        <FieldArray name="languages">
            {({ push, remove }) => (
                <div className="col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-400">Languages</label>
                    {values.languages.map((language, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Field as="select" name={`languages[${index}].name`} className="form-select w-full p-2 text-gray-700 rounded">
                                {languages.map((lang) => (
                                    <option key={lang._id} value={lang.name}>{lang.name}</option>
                                ))}
                            </Field>
                            <Field as="select" name={`languages[${index}].level_name`} className="form-select w-full p-2 text-gray-700 rounded">
                                {levels.map((level) => (
                                    <option key={level._id} value={level.name}>{level.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name={`languages[${index}].name`} component="div" className="text-red-500 text-xs" />
                            <ErrorMessage name={`languages[${index}].level_name`} component="div" className="text-red-500 text-xs" />
                            <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => push({ name: '', level_name: '' })} className="text-white bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition duration-300">
                        Add Language
                    </button>
                </div>
            )}
        </FieldArray>
    );
}

export default LanguagesSection;
