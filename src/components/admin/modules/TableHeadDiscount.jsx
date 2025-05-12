import React from 'react';

function TableHeadDiscount({children }) {
    return (
        <th className="p-3 whitespace-nowrap">{children}</th>
    );
}

export default TableHeadDiscount;