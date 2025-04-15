import React from 'react';
import Image from "next/image";

function LoadingOrError({ message }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative flex flex-col justify-center items-center">
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                <Image src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
                       className="rounded-full h-28 w-28" width={100} height={100} alt="loading icon" />
            </div>
            <span className="text-black text-2xl mt-10">{message}</span>
        </div>
    );
}

export default LoadingOrError;