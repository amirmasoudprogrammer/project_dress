"use client"
import React from 'react';

function PriceClient({value }) {
    return (
        <>{Number(value).toLocaleString("fa-IR")} تومان</>
    );
}

export default PriceClient;