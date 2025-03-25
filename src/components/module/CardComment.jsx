import React from 'react';
import Image from "next/image";
import { FaStar } from "react-icons/fa6";

function CardComment({ data }) {
    const { name, image, des } = data;
    return (
        <div className="w-full max-w-[240px] md:max-w-[312px] h-auto md:h-full border border-[#CACACA] shadow-2xl p-6 md:p-10 rounded-2xl flex flex-col mb-6 md:mb-0">
            <div className="flex items-center border-b border-[#111111] pb-5">
                <Image className="rounded-full shadow-lg w-[80px] h-[80px] md:w-[120px] md:h-[120px]" src={image} width={120} height={120} alt="image" />
                <div className="mr-2">
                    <span className="text-black text-[12px] md:text-[16px] font-bold">{name}</span>
                    <div className="text-yellow-400 mt-2 flex items-center text-[16px] md:text-[20px]">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <p className="text-black text-center text-[12px] md:text-[14px]">
                    {des}
                </p>
            </div>
        </div>
    );
}

export default CardComment;
