import React from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

function Pagination({ meta, onPageChange }) {
    const currentPage = meta.current_page[0];
    const lastPage = meta.last_page[0];

    const handlePageClick = (page) => {
        if (page >= 1 && page <= lastPage && page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;

        if (end > lastPage) {
            end = lastPage;
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`px-3 py-1 rounded mx-1 text-sm ${
                        i === currentPage
                            ? "bg-[#6E8E59] text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            {/* دکمه قبلی */}
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-[#6E8E59] hover:bg-gray-300 disabled:opacity-50 text-white"
            >
                <FaChevronRight />
            </button>

            {renderPageNumbers()}

            {/* دکمه بعدی */}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="p-2 rounded-full bg-[#6E8E59] hover:bg-gray-300 disabled:opacity-50 text-white"
            >
                <FaChevronLeft />
            </button>
        </div>
    );
}

export default Pagination;
