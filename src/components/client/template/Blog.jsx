"use client";
import React, {useEffect, useRef, useState} from "react";
import Title from "@/components/client/template/Title";
import Image from "next/image";
import Link from "next/link";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation} from "swiper/modules";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa6";
import Cookies from "js-cookie";
import axios from "axios";

function Blog() {
    const [blog , setBlog] =useState([])
    useEffect(() => {
        const fetchBlog= async () => {
            try {
                const token = Cookies.get('token');
                const res = await axios.get(`https://joppin.ir/api/v1/blog`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                setBlog(res.data.data)
            } catch (error) {
                console.error(`Error fetching banners for:`, error);
            }
        };

        fetchBlog()
        const interval = setInterval(() => {
            fetchBlog()
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    console.log(blog)

    const swiperRef = useRef(null);



    return (
        <div>
            <Title name="وبلاگ ما"/>
            <div className="flex  container  justify-between mt-5  m-auto flex-col-reverse md:flex-row ">
                {/* اسلایدر */}
                <div className="flex-1 flex justify-center mb-5  md:mr-0 items-center m-auto max-w-full overflow-hidden relative">
                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        loop={true}
                        navigation={false} // دکمه‌های پیش‌فرض Swiper غیرفعال می‌شوند
                        modules={[Navigation]}
                        className="mySwiper "
                    >
                        {blog.map((slide) => (
                            <SwiperSlide key={slide.id} className="mr-1 mt-10 md:mt-0 md:mr-0">
                                <Link href={`/Blog/${slide.id}`}>
                                    <Image
                                        className="w-[320px] md:w-[879px] md:h-[500px] object-cover"
                                        src={slide.images[0]?.image_path}
                                        alt="تصویر"
                                        width={200}
                                        height={200}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))}


                    </Swiper>

                    {/* دکمه‌های چپ و راست زیر اسلایدر */}
                </div>
                {/* مطالب اخیر الیزا */}
                <div className=" md:mr-10 flex flex-col items-center">
                    <span
                        className="text-black  w-[330px] md:w-[392px] h-[48px] bg-[#6E8E59] flex items-center justify-center text-white">
                        مطالب اخیر الیزا
                    </span>

                    <div className="flex flex-col mt-5 mr-5 md:mr-0 md:w-[600px]">
                        {blog.map((article) => (
                            <div key={article.id} className="flex items-center border-b-2 border-b-neutral-300 mt-3 pb-5">
                                <Image src={article.images[0]?.image_path} alt={article.images[0]?.description || 'img'} width={104} height={88} />
                                <div className="ml-3 md:mr-5">
                <span className="text-black dark:text-white text-[10px] mr-5 md:mr-0 font-bold md:text-sm">
                  {article.title}
                </span>
                                    <p className="text-[#626262] dark:text-white mr-5 md:mr-0 text-[10px] md:text-sm mt-2 mb-3">
                                        {article.content}
                                    </p>
                                    <Link className="text-[#6E8E59] dark:text-green-700 mr-5 md:mr-0 text-[10px] md:text-sm" href={`/Blog/${article.id}`}>
                                        مشاهده مطلب
                                    </Link>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <div className="absolute flex-col items-center left-0 right-0 transform m-auto justify-center mt-10 flex space-x-4">
                <div className="ml-5">
                    <button
                        onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
                        className="ml-5 border rounded-full bg-slate-200 border-2 border-black hover:shadow-lg hover:shadow-blue-200 transition-all duration-500 hover:scale-90 p-3"
                    >
                        <FaAngleRight color="black" size={20}/>
                    </button>
                    <button
                        onClick={() => swiperRef.current && swiperRef.current.slideNext()}
                        className="border rounded-full bg-slate-200 border-2 border-black hover:shadow-lg hover:shadow-blue-200 transition-all duration-500 hover:scale-90 p-3"
                    >
                        <FaAngleLeft color="black" size={20}/>
                    </button>
                </div>
                <div className=" relative right-2 md:right-0 md:flex text-white rounded-lg flex h-[48px] items-center justify-center mt-10   md:mr-0  bg-[#6E8E59] w-[250px]  md:w-[149px]">
                    <Link href="/Blog" className="ml-2">
                        مشاهده همه
                    </Link>
                    <FaAngleLeft color="white"/>
                </div>

            </div>

        </div>
    );
}

export default Blog;
