import React from 'react';

function InputField({ label, name, type = "text", value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-300 text-black rounded px-3 py-2"
                placeholder={label}
            />
        </div>
    );
}

export default InputField;