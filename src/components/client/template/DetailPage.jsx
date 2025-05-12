"use client"
import React from 'react';
import Image from "next/image";
import {GrFormView} from "react-icons/gr";
import Title from "@/components/client/template/Title";
import CareSection from "@/components/client/module/CareSection";
import { motion } from 'framer-motion'; // ایمپورت صحیح motion


function DetailPage() {
    const images = [
        { src: '/Rectangle 242.png', alt: 'image' },
        { src: '/Rectangle 243.png', alt: 'image' },
        { src: '/Rectangle 244.png', alt: 'image' },
        { src: '/Rectangle 245.png', alt: 'image' },
        { src: '/Rectangle 246.png', alt: 'image' }
    ];

    return (
        <>
            <div className="container m-auto  mt-10">
                <div className="block md:hidden">
                    <Title name="وبلاگ"/>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                <div>
                    <div className="flex items-center justify-center">
                        <Image src="/image/Rectangle 240.png" width={1224} height={719} alt="image"/>
                    </div>
                    <div>
                        <div
                            className="border-b w-[312px] m-auto md:w-auto border-[#626262] flex flex-col md:flex-row items-center justify-center md:justify-between mt-5 md:mt-16 ">
                            <p className="text-black md:mb-5 text-center text-[12px] md:text-[16px] w-[210px] md:w-auto font-bold">عنوان
                                مقاله راهنمای شستشوی لباس شب واتوکشی ونگهداری</p>
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
                            <span className="text-black font-normal">لباس‌های شب از پارچه‌های حساس مانند حریر، ساتن، مخمل، گیپور، تور و ابریشم تهیه می‌شوند، بنابراین شستشوی آن‌ها نیاز به دقت و مراقبت ویژه دارد.</span>
                            <div className="flex flex-col items-start justify-start text-black">
                                <span className="font-medium">۱. بررسی لیبل شستشو</span>
                                <p>قبل از شستن، برچسب راهنمای شستشو را بررسی کنید. برخی لباس‌ها فقط باید خشکشویی شوند و
                                    شستن
                                    آن‌ها در خانه ممکن است باعث آسیب شود.</p>
                            </div>
                            <div className="flex flex-col items-start justify-start text-black">
                                <span className="font-medium">۲. شستشوی (بهترین روش) </span>
                                <p>آب ولرم یا سرد (حداکثر ۳۰ درجه) استفاده کنید.از مایع شوینده ملایم مثل شامپو بچه یا
                                    شوینده
                                    مخصوص لباس‌های ظریف استفاده کنید. لباس را در تشت آب قرار دهید و به‌آرامی تکان دهید
                                    (چنگ
                                    نزنید و نپیچانید).بعد از چند دقیقه، آب را عوض کرده و لباس را با آب تمیز بشویید.هرگز
                                    لباس
                                    را نچلانید..</p>
                            </div>
                            <div className="flex flex-col items-start justify-start text-black">
                                <span className="font-medium">۳. شستشوی ماشینی (در صورت مجاز بودن)</span>
                                <p> لباس را داخل کیسه مخصوص لباس‌های حساس بگذارید.ماشین لباسشویی را روی دور کند و برنامه
                                    لباس‌های ظریف (Delicate) تنظیم کنید.از آب سرد و مایع شوینده ملایم استفاده
                                    کنید.خشک‌کن را
                                    روشن نکنید!</p>
                            </div>
                            <div className="flex flex-col items-start justify-start text-black">
                                <span className="font-medium">۴. خشک کردن لباس شب</span>
                                <p>لباس را نچلانید و در خشک‌کن نیندازید.روی یک حوله خشک پهن کنید و آب اضافی آن را با
                                    دستمال
                                    بگیرید.روی سطح صاف یا چوب‌لباسی در سایه خشک کنید.با این روش‌ها، لباس شب شما سالم و
                                    زیبا
                                    باقی می‌ماند! </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 flex flex-col md:flex-row justify-start items-start border-b border-[#626262] pb-5">
                    <div>
                        <Image src="/image/Rectangle 241.png" width={660} height={728} alt="image"/>
                    </div>
                    <div className="w-[360px] text-center m-auto md:text-start md:w-[509px] md:mr-10 text-[16px] mt-5">
                        <span className="text-black font-normal">اتو کشیدن لباس‌های شب نیاز به دقت بیشتری دارد چون معمولاً از پارچه‌های حساس و ظریف مانند ساتن، حریر، مخمل یا گیپور ساخته شده‌اند. این نکات را رعایت کن:</span>
                        <div className=" flex flex-col md:items-start justify-start text-black">
                            <span className="font-medium">۱. برچسب مراقبت لباس را چک کن</span>
                            <p>روی هر لباس یک برچسب مراقبت وجود دارد که دمای مناسب اتو و سایر توصیه‌ها را مشخص
                                می‌کند.</p>
                        </div>
                        <div className=" flex flex-col md:items-start justify-start text-black">
                            <span className="font-medium">۲. دمای مناسب را تنظیم کن </span>
                            <p>حریر و ساتن: دمای پایین و حتماً از یک پارچه محافظ نازک بین اتو و لباس استفاده کن.</p>
                            <p>مخمل: بهتر است به جای اتو، از بخار استفاده کنی و از تماس مستقیم با سطح اتو خودداری
                                کنی.</p>
                            <p>گیپور و دانتل: حرارت خیلی کم و حتماً از پشت اتو کن.</p>
                        </div>
                        <div className=" flex flex-col md:items-start justify-start text-black">
                            <span className="font-medium">۳. از بخار استفاده کن</span>
                            <p>بخار کمک می‌کند چروک‌ها بدون آسیب به بافت لباس از بین بروند. اگر اتو بخار ندارد، لباس را
                                روی یک چوب‌لباسی آویزان کن و از بخار آب جوش برای صاف کردن آن استفاده کن.</p>
                        </div>
                        <div className=" flex flex-col md:items-start justify-start text-black">
                            <span className="font-medium">۴. پارچه محافظ بگذار</span>
                            <p>برای جلوگیری از برق افتادن یا سوختن لباس، یک پارچه نخی سبک یا حوله نازک بین اتو و پارچه
                                قرار بده.</p>
                        </div>
                        <div className=" flex flex-col md:items-start justify-start text-black">
                            <span className="font-medium">۵. لباس را برعکس کن</span>
                            <p>بیشتر پارچه‌های ظریف را بهتر است از پشت اتو کنی تا به سطح اصلی آسیبی نرسد.</p>
                        </div>
                        <div className=" flex flex-col md:items-start justify-start text-black">
                            <span className="font-medium">۶. اتو را روی پارچه نکش، فقط بگذار و بردار</span>
                            <p>برای جلوگیری از کشیدگی پارچه، اتو را روی لباس نگذار و نکش، بلکه فقط آن را روی پارچه قرار
                                بده و بردار.</p>
                        </div>
                        <div className=" flex flex-col md:items-start justify-start text-black">
                            <span className="font-medium">۷. بعد از اتوکشی، اجازه بده لباس کاملاً خنک شود</span>
                            <p>قبل از پوشیدن یا آویزان کردن، بگذار لباس کاملاً خنک شود تا از ایجاد چروک دوباره جلوگیری
                                شود.</p>
                            <p>اگه پارچه خاصی مدنظرت هست، بگو تا راهنمایی دقیق‌تری بدم. </p>
                        </div>
                    </div>

                </div>
                </motion.div>
                {images.map((image, index) => (
                    <CareSection key={index} imageSrc={image.src} imageAlt={image.alt} />
                ))}
            </div>

        </>

    );
}

export default DetailPage;