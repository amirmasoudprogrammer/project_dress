"use client"
import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion'; // ایمپورت صحیح motion

function CareSection({ imageSrc, imageAlt }) {
    const tips = [
        {
            title: '۱. برچسب مراقبت لباس را چک کن',
            description: 'روی هر لباس یک برچسب مراقبت وجود دارد که دمای مناسب اتو و سایر توصیه‌ها را مشخص می‌کند.'
        },
        {
            title: '۲. دمای مناسب را تنظیم کن',
            description: 'حریر و ساتن: دمای پایین و حتماً از یک پارچه محافظ نازک بین اتو و لباس استفاده کن. مخمل: بهتر است به جای اتو، از بخار استفاده کنی و از تماس مستقیم با سطح اتو خودداری کنی. گیپور و دانتل: حرارت خیلی کم و حتماً از پشت اتو کن.'
        },
        {
            title: '۳. از بخار استفاده کن',
            description: 'بخار کمک می‌کند چروک‌ها بدون آسیب به بافت لباس از بین بروند. اگر اتو بخار ندارد، لباس را روی یک چوب‌لباسی آویزان کن و از بخار آب جوش برای صاف کردن آن استفاده کن.'
        },
        {
            title: '۴. پارچه محافظ بگذار',
            description: 'برای جلوگیری از برق افتادن یا سوختن لباس، یک پارچه نخی سبک یا حوله نازک بین اتو و پارچه قرار بده.'
        },
        {
            title: '۵. لباس را برعکس کن',
            description: 'بیشتر پارچه‌های ظریف را بهتر است از پشت اتو کنی تا به سطح اصلی آسیبی نرسد.'
        },
        {
            title: '۶. اتو را روی پارچه نکش، فقط بگذار و بردار',
            description: 'برای جلوگیری از کشیدگی پارچه، اتو را روی لباس نگذار و نکش، بلکه فقط آن را روی پارچه قرار بده و بردار.'
        },
        {
            title: '۷. بعد از اتوکشی، اجازه بده لباس کاملاً خنک شود',
            description: 'قبل از پوشیدن یا آویزان کردن، بگذار لباس کاملاً خنک شود تا از ایجاد چروک دوباره جلوگیری شود.'
        }
    ];

    return (
        <div className="flex flex-col mt-16 border-[#626262] border-b pb-5 mr-2 ml-2 md:ml-0 md:mr-0">
            {/* انیمیشن برای تصویر */}
            <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Image src={imageSrc} width={666} height={596} alt={imageAlt} />
            </motion.div>

            {/* انیمیشن برای متن */}
            <motion.div
                className="mt-5 text-center md:text-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <span className="font-medium text-black text-[14px]">
                    اتو کشیدن لباس‌های شب نیاز به دقت بیشتری دارد چون معمولاً از پارچه‌های حساس و ظریف ساخته شده‌اند. این نکات را رعایت کن:
                </span>
                {tips.map((tip, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.2 }}
                    >
                        <span className="font-medium text-black text-[14px]">{tip.title}</span>
                        <p className="font-medium text-black text-[14px]">{tip.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default CareSection;
