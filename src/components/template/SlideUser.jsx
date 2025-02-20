"use client"
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import {FreeMode, Autoplay} from 'swiper/modules';
import CardUser from "@/components/module/CardUser";
import {users} from "@/utils/Users";


function SlideUser() {
    return (
        <div
            className="-mt-14 md:-mt-28 flex items-center justify-center md:mr-5"> {/* کاهش فاصله با کامپوننت بالایی */}
            <Swiper
                slidesPerView={5}
                freeMode={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false
                }}
                modules={[FreeMode, Autoplay]}
                className="mySwiper"
                breakpoints={{
                    640: {slidesPerView: 3, spaceBetween: 15},
                    768: {slidesPerView: 4, spaceBetween: 15},
                    1024: {slidesPerView: 10, spaceBetween: 20} // کاهش تعداد برای خوانایی بهتر
                }}
            >
                {users.map((user) => (
                    <SwiperSlide key={user.id} className="md:m-0 mr-14">
                        <div className="w-auto  rounded-full flex  items-center justify-center text-black">
                            <CardUser data={user}/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SlideUser;

