import React from 'react';
import { FieldArray, Field, ErrorMessage } from 'formik';

export default function SkillsSection({ values, skillType, fieldName }) {
    return (
        <FieldArray name={fieldName}>
            {({ push, remove }) => (
                <div className="col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-400">{skillType}</label>
                    {values[fieldName].map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Field name={`${fieldName}[${index}]`} className="form-input w-full p-2 text-white rounded outline-none focus:ring-2 focus:ring-pink-500" />
                            <ErrorMessage name={`${fieldName}[${index}]`} component="div" className="text-red-500 text-xs" />
                            <button type="button" onClick={() => remove(index)} className="text-red-500">Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => push('')} className="text-white bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition duration-300">
                        Add {skillType}
                    </button>
                </div>
            )}
        </FieldArray>
    );
}