import React from 'react';

function Badge({ label, onRemove }) {
    return (
        <div className="flex items-center gap-1 bg-gray-200 text-gray-700 text-xs rounded-full px-3 py-1">
            {label}
            <button onClick={onRemove} className="text-red-500 hover:text-red-700">×</button>
        </div>
    );
}

export default Badge;