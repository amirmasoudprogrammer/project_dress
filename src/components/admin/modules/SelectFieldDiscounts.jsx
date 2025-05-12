import React from 'react';

function SelectFieldDiscounts({ label, name, value, onChange, options }) {
    return (
        <div>
            <label className="block text-xs font-semibold mb-1">{label}</label>
            <select name={name} value={value} onChange={onChange} className="w-full p-2 border rounded-lg text-sm">
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectFieldDiscounts;