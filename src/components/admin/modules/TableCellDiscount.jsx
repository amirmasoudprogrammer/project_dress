import React from 'react';

function TableCellDiscount({children ,className = "" }) {
    return (
     <td className={`p-3 whitespace-nowrap ${className}`}>{children}</td>
    );
}

export default TableCellDiscount;