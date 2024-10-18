import React from 'react';
import { Field, ErrorMessage } from 'formik';

export default function InfoInput({ fields }) {
    return (
        <>
            {fields.map((field) => (
                field.type === "text" || field.type === "date" || field.type === "email" || field.type === "tel" || field.type === "password" ? (
                    <div key={field.name} className="space-y-2">
                        <label htmlFor={field.name} className="block text-sm font-semibold text-white">{field.label}</label>
                        <Field name={field.name} type={field.type} className="form-input w-full p-2 text-white rounded outline-none focus:ring-2 focus:ring-pink-500 bg-[#151515]" />
                        <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs" />
                    </div>
                ) : field.type === "select" ? (
                    <div key={field.name} className="space-y-2">
                        <label htmlFor={field.name} className="block text-sm font-semibold white">{field.label}</label>
                        <Field as="select" name={field.name} className="form-select w-full p-2 text-gray-700 rounded bg-[#151515]">
                            {field.options.map((type, index) => (
                                <option key={index} value={type.name}>{type.name}</option>
                            ))}
                        </Field>
                    </div>
                ) : field.type === "checkbox" ? (
                    <div key={field.name} className="space-y-2">
                        <label className="block text-sm font-semibold white">{field.label}</label>
                        <Field name={field.name} type="checkbox" className="form-checkbox h-4 w-4 text-pink-600 transition duration-150 ease-in-out bg-[#151515]" />
                        <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs" />
                    </div>
                ) : (
                    <div key={field.name} className="col-span-2 space-y-2">
                        <label className="block text-sm font-semibold white">{field.label}</label>
                        <Field as="textarea" name={field.name} className="form-textarea w-full p-2 text-white rounded outline-none focus:ring-2 focus:ring-pink-500 bg-[#151515]" />
                        <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs" />
                    </div>
                )
            ))}
        </>
    );
}
