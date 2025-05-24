"use client"
import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

function Banner() {
    const [banners , setBanners] =useState([])
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const token = Cookies.get('token');
                const res = await axios.get(`https://joppin.ir/api/banners/position/${0}` ,{
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                })
                setBanners(res.data.data)
            }catch (error) {
                console.log(error)
            }
        }



        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    },[])
    
    
    
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
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <Link href="/Products">
                            <Image className="w-full h-auto object-cover" src={banner.image} alt="Slide 1" width={1920} height={1080} />
                        </Link>
                    </SwiperSlide>
                ))}
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


