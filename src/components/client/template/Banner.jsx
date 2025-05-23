"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";

function Banner() {
    return (
        <div className="relative w-full z-0 md:-top-40 -top-20">
            <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev'
                }}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Link href="/Products">
                    <Image className="w-full h-auto object-cover" src="/image/Rectangle 4.svg" alt="Slide 1" width={1920} height={1080} />
                   </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/Products">
                    <Image className="w-full h-auto object-cover" src="/image/Rectangle 4.svg" alt="Slide 2" width={1920} height={1080} />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/Products">
                    <Image className="w-full h-auto object-cover" src="/image/Rectangle 4.svg" alt="Slide 3" width={1920} height={1080} />
                    </Link>
                </SwiperSlide>
            </Swiper>

            {/* دکمه‌های ناوبری */}
            <button className="custom-prev  absolute left-4 md:left-20 top-1/2 transform -translate-y-1/2 z-10  p-2 rounded-full">
                <FaAngleLeft size={30} color="black" />
            </button>
            <button className="custom-next  absolute right-4 md:right-20 top-1/2 transform -translate-y-1/2 z-10  p-2 rounded-full">
                <FaAngleRight size={30} color="black" />
            </button>
        </div>
    );
}

export default Banner;


