import React from 'react';

function Pagination({ meta, onPageChange }) {
    if (!meta) return null;

    const { current_page, last_page } = meta;

    const handleClick = (page) => {
        if (page !== current_page && page > 0 && page <= last_page) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex gap-2 items-center justify-center mt-5">
            <button
                onClick={() => handleClick(current_page - 1)}
                disabled={current_page === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
                قبلی
            </button>

            {[...Array(last_page)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handleClick(index + 1)}
                    className={`px-3 py-1 rounded ${current_page === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => handleClick(current_page + 1)}
                disabled={current_page === last_page}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
                بعدی
            </button>
        </div>
    );
}
export default Pagination
