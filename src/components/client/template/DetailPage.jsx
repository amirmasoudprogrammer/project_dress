"use client"
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {GrFormView} from "react-icons/gr";
import Title from "@/components/client/template/Title";
import CareSection from "@/components/client/module/CareSection";
import {motion} from 'framer-motion';


function DetailPage({data}) {
    const {content , images ,title} = data.data
    console.log(data)

    return (
        <>
            <div className="container m-auto  mt-10">
                <div className="block md:hidden">
                    <Title name="وبلاگ"/>
                </div>
                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    transition={{duration: 1}}
                >
                    <div>
                        <div className="flex items-center justify-center">
                            <Image src={images[0]?.image_path} width={1224} height={719} alt="image"/>
                        </div>
                        <div>
                            <div
                                className="border-b w-[312px] m-auto md:w-auto border-[#626262] flex flex-col md:flex-row items-center justify-center md:justify-between mt-5 md:mt-16 ">
                                <p className="text-black md:mb-5 text-center text-[12px] md:text-[16px] w-[210px] md:w-auto font-bold">{title}</p>
                                <div className="flex items-center justify-between mt-5 w-full md:w-auto md:mt-0">
                            <span
                                className="text-[#626262] text-[12px] mr-2 md:mr-0 md:ml-60 mb-5 ">۵ دقیقه زمان خواندن</span>
                                    <div className="flex items-center text-[#626262] mb-5 ml-2 md:ml-0">
                                        <GrFormView/>
                                        <span className="text-[#626262] text-[12px]">۲۰۰ بازدید</span>

                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex text-[14px] m-auto w-[300px] md:w-auto md:text-lg flex-col items-start justify-between mt-5 md:mt-16 mr-6 md:mr-0">
                                <span className="text-black font-normal">{title}</span>
                                <div className="flex flex-col items-start justify-start text-black">
                                    <span className="font-medium">۱.{title}</span>
                                    <p>{content}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div
                        className="mt-16 flex flex-col md:flex-row justify-start items-start border-b border-[#626262] pb-5">
                        <div>
                            <Image src={images[1]?.image_path} width={660} height={728} alt="image"/>
                        </div>
                        <div
                            className="w-[360px] text-center m-auto md:text-start md:w-[509px] md:mr-10 text-[16px] mt-5">
                            <span className="text-black font-normal">{title}</span>
                            <div className=" flex flex-col md:items-start justify-start text-black">
                                <span className="font-medium">1. {title} </span>
                                <p>{content}</p>
                            </div>

                        </div>

                    </div>
                </motion.div>
                {images.map((image) => (
                    <CareSection key={image.id} imageSrc={image}  />
                ))}
            </div>

        </>

    );
}

export default DetailPage;