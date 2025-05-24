import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper/modules";
import {DataComment} from "@/utils/Users";
import CardComment from "@/components/client/module/CardComment";
import Cookies from "js-cookie";
import axios from "axios";

function CommentPost({id}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [comment , setComment] =useState([])
    const indicatorsCount = 5;



    useEffect(() => {
        const fetchData = async () =>{
            try {
                const token = Cookies.get('tokenAdmin');
                const res = await axios.get(`https://joppin.ir/api/products/${id}/comments` ,{
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                })
                setComment(res)


            }catch (error) {
                console.log(error)
            }
        }



        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    },[])





    const filters = comment.data?.data?.filter(item => item.status === "approved")

    console.log(comment)

    return (
        <div className="flex items-center justify-center  mt-16">
            <div className="w-full mt-10">
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6, ease: "easeOut"}}
                    viewport={{once: true}}
                >
                    <div className="flex flex-col">
                        <h2 className="text-black text-2xl font-bold text-center pb-2">نظرات مشتریان</h2>
                        <p className="w-[150px] h-[3px] bg-black m-auto"></p>
                    </div>

                </motion.div>

                <motion.div
                    initial={{opacity: 0, y: 50}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                    viewport={{once: true, amount: 0.2}}
                    className="relative w-full mt-10"
                >
                    <Swiper
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex % indicatorsCount)}
                        slidesPerView={2}
                        centeredSlides={true}
                        freeMode={true}
                        loop={true}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                        }}
                        modules={[FreeMode]}
                        className="mySwiper"
                        breakpoints={{
                            480: {slidesPerView: 1, spaceBetween: 30},
                            640: {slidesPerView: 2, spaceBetween: 15},
                            768: {slidesPerView: 3, spaceBetween: 15},
                            1024: {slidesPerView: 4, spaceBetween: 25},
                        }}
                    >
                        {filters && Array.isArray(filters) && filters.length > 0 ? (
                            filters.map((item,index) => (
                                <SwiperSlide
                                    key={item.id}
                                    className="transition-all duration-500 mr-5  pt-16"
                                >

                                    <motion.div
                                        initial={{opacity: 0, y: 50}}
                                        whileInView={{opacity: 1, y: 0}}
                                        transition={{
                                            duration: 0.6,
                                            ease: "easeOut",
                                            delay: index * 0.1,
                                        }}
                                        viewport={{once: true, amount: 0.2}}
                                    >
                                        <CardComment data={item}/>
                                    </motion.div>
                                </SwiperSlide>
                            ))
                        ) : (
                            <p className="text-center mt-5 text-black">هیچ کامنتی یافت نشد!</p>
                        )}
                    </Swiper>

                    {/* Indicators */}
                    <div className="flex justify-center mt-5 space-x-2">
                        {Array.from({length: indicatorsCount}).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-5 h-3 rounded-full transition-all duration-300 ${
                                    index === activeIndex ? "bg-black scale-125" : "bg-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default CommentPost;