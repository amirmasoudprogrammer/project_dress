import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { CiShare2 } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";

function CardBlog({data}) {
    const {id,image, title, descriptions, time, time_see} = data
    return (
        <div className="  flex w-[350px] m-auto md:w-full flex-col md:flex-row items-center p-5 shadow-2xl rounded border border-[#CACACA] md:h-[208px] mt-10 ">
            <div>
                <Image className="rounded" src={image} width={272} height={216} alt="image"/>
            </div>
            <div className=" flex flex-col justify-evenly w-full h-full ">
                <div className="flex  items-start justify-start md:items-start md:justify-between mr-5 mt-2  ">
                    <div className="mt-5 md:mt-0">
                        <span className="text-black text-[16px] md:text-lg font-bold">{title}</span>
                        <p className="text-[#626262] text-[12px] md:text-sm mt-2">{descriptions.des1}</p>
                    </div>
                    <div className=' hidden md:block relative -top-9 right-2 text-black cursor-pointer'>
                        <CiShare2 />
                    </div>
                </div>
                <div className="flex mr-5 relative top-6 mb-10 md:mb-0 text-black justify-between items-center md:w-full ">
                    <div className="flex items-center ">
                        <span className=" text-[10px] md:text-sm md:ml-5 w-[100px] md:w-auto">{time_see}</span>
                        |
                        <p className="text-[10px] md:text-sm mr-2 md:mr-5 text-[#626262]">{time}</p>
                    </div>
                    <div className="md:ml-5 flex items-center justify-between">
                       <Link className="text-[10px] md:text-sm ml-2 text-[#6E8E59]" href={`/Blog/${id}`}>مشاهده مطلب</Link>
                       <div className=" text-[10px] md:text-sm">
                           <FaArrowLeftLong color="#6E8E59"/>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardBlog;