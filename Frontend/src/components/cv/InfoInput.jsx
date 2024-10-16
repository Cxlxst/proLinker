import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function InfoInput({ fields }) {
    return (
        <>
            {fields.map((field) => (
                field.type === "text" || field.type === "date" ? (
                    <div key={field.name} className="space-y-2">
                        <label htmlFor={field.name} className="block text-sm font-semibold text-gray-400">{field.label}</label>
                        <Field name={field.name} type={field.type} className="form-input w-full p-2 text-white rounded outline-none focus:ring-2 focus:ring-pink-500" />
                        <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs" />
                    </div>
                ) : field.type === "select" ? (
                    <div key={field.name} className="space-y-2">
                        <label htmlFor={field.name} className="block text-sm font-semibold text-gray-400">{field.label}</label>
                        <Field as="select" name={field.name} className="form-select w-full p-2 text-gray-700 rounded">
                            {field.options.map((type, index) => (
                                <option key={index} value={type.name}>{type.name}</option>
                            ))}
                        </Field>
                    </div>
                ) : field.type === "checkbox" ? (
                    <div key={field.name} className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-400">{field.label}</label>
                        <Field name={field.name} type="checkbox" className="form-checkbox h-4 w-4 text-pink-600 transition duration-150 ease-in-out" />
                        <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs" />
                    </div>
                ) : (
                    <div key={field.name} className="col-span-2 space-y-2">
                        <label className="block text-sm font-semibold text-gray-400">{field.label}</label>
                        <Field as="textarea" name={field.name} className="form-textarea w-full p-2 text-white rounded outline-none focus:ring-2 focus:ring-pink-500" />
                        <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs" />
                    </div>
                )
            ))}
        </>
    );
}
