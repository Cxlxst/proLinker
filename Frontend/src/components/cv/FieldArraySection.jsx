import React from 'react';
import { FieldArray } from 'formik';
import InfoInput from './InfoInput';

function FieldArraySection({ title, fieldArrayName, values }) {
    return (
        <FieldArray name={fieldArrayName}>
            {({ push, remove }) => (
                <div className="col-span-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-400">{title}</label>
                    {values[fieldArrayName].map((item, index) => (
                        <div key={index} className="flex flex-col space-y-2">
                            <div className="grid grid-cols-2 gap-6">
                                <InfoInput
                                    fields={[
                                        { name: `${fieldArrayName}[${index}].structureName`, label: "Structure Name", type: "text" },
                                        { name: `${fieldArrayName}[${index}].name`, label: "Title", type: "text" },
                                        { name: `${fieldArrayName}[${index}].beginning`, label: "Start Date", type: "date" },
                                        { name: `${fieldArrayName}[${index}].end`, label: "End Date", type: "date" },
                                        { name: `${fieldArrayName}[${index}].current`, label: "Current", type: "checkbox" },
                                        { name: `${fieldArrayName}[${index}].description`, label: "Description", type: "textarea" },
                                    ]}
                                />
                            </div>
                            <button type="button" onClick={() => remove(index)} className="text-red-500 mt-2">
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => push({ name: '', beginning: '', end: '', current: false, structureName: '', description: '' })}
                        className="text-white bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
                    >
                        Add {title}
                    </button>
                </div>
            )}
        </FieldArray>
    );
}

export default FieldArraySection;
