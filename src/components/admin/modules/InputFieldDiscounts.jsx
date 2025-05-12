import React from 'react';

function InputFieldDiscounts({ label, name, value, onChange, textarea, type = "text" }) {
    return (
        <div>
            <label className="block text-xs font-semibold mb-1">{label}</label>
            {textarea ? (
                <textarea name={name} value={value} onChange={onChange} rows="3" className="w-full p-2 border rounded-lg text-sm" />
            ) : (
                <input type={type} name={name} value={value} onChange={onChange} className="w-full p-2 border rounded-lg text-sm" />
            )}
        </div>
    );
}

export default InputFieldDiscounts;