"use client"
import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";
import Image from "next/image";
import {FaAngleLeft} from "react-icons/fa6";
import {FaAngleRight} from "react-icons/fa";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";

function BannerItem2(props) {

    const [banners1, setBanners1] = useState([])
    const [banners2, setBanners2] = useState([])

    useEffect(() => {
        const fetchBanners = async (position, setter) => {
            try {
                const token = Cookies.get('token');
                const res = await axios.get(`https://joppin.ir/api/banners/position/${position}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                setter(res.data.data);
            } catch (error) {
                console.error(`Error fetching banners for position ${position}:`, error);
            }
        };

        fetchBanners(1, setBanners1);
        fetchBanners(2, setBanners2);

        const interval = setInterval(() => {
            fetchBanners(1, setBanners1);
            fetchBanners(2, setBanners2);
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="relative w-full md:bottom-36 bottom-20  ">
            <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{delay: 3000, disableOnInteraction: false}}
                loop={true}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev'
                }}
                className="mySwiper"
            >
                {banners1.map((banner1, index) => {
                    const banner2 = banners2[index];
                    if (!banner2) return null;
                    return (
                        <SwiperSlide key={banner1.id + '-' + (banner2?.id || index)}>
                            <Link href="/Products" className="flex flex-row items-center w-full">
                                <div className="w-1/2 h-[900px]">
                                    <Image
                                        src={banner1.image}
                                        alt="Slide 1"
                                        className="w-full h-full object-cover"
                                        width={500}
                                        height={300}
                                    />
                                </div>
                                {banner2 && (
                                    <div className="w-1/2 h-[900px]">
                                        <Image
                                            src={banner2.image}
                                            alt="Slide 2"
                                            className="w-full h-full object-cover"
                                            width={500}
                                            height={300}
                                        />
                                    </div>
                                )}
                            </Link>
                        </SwiperSlide>
                    );
                })}


            </Swiper>

            {/* دکمه‌های ناوبری */}
            <button className="custom-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10  p-2 rounded-full">
                <FaAngleLeft size={50} color="black"/>
            </button>
            <button className="custom-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10  p-2 rounded-full">
                <FaAngleRight size={50} color="black"/>
            </button>
        </div>
    );
}

export default BannerItem2;