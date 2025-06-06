"use client";
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {motion} from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";

function Banneritem3() {
    const [banners, setBanners] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                const res = await axios.get(`https://joppin.ir/api/banners/position/4`, {
                    headers: token ? {Authorization: `Bearer ${token}`} : {}
                });
                setBanners(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);
    if (!banners) return null;


    return (
        <>
            {
                banners ? (
                        banners.map((banner) => (
                            <Link  key={banner.id} href="/products">
                                <Image
                                    className="w-full h-auto object-cover mt-36"
                                    src={banner.image}
                                    alt={banner.alt || "Banner"}
                                    width={1920}
                                    height={600}
                                />
                            </Link>
                        ))

                ) : (
                    <>
                        <div className="mt-24 relative hidden md:block overflow-hidden">
                            <Image className="w-screen" src="/image/Group 961.png" alt="img" layout="responsive"
                                   width={900} height={500}/>
                            <div className="flex flex-col items-center justify-center">
                                {/* تصویر بالا */}
                                <motion.div
                                    className="absolute top-0 flex justify-center w-full"
                                    initial={{opacity: 0, y: -50}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.8}}
                                    viewport={{once: true}}
                                >
                                    <Image src="/image/Rectangle 262.png" alt="img" width={300} height={300}/>
                                </motion.div>

                                {/* دو تصویر پایینی */}
                                <div
                                    className="flex w-full flex-col items-center  overflow-hidden absolute top-52 bottom-0">
                                    <motion.div
                                        className="flex w-full  justify-around gap-20"
                                        initial={{opacity: 0, y: 50}}
                                        whileInView={{opacity: 1, y: 0}}
                                        transition={{duration: 0.8, delay: 0.6}}
                                        viewport={{once: true}}
                                    >
                                        <div className="flex flex-col items-center">
                                            <Image src="/image/Group 960.png" alt="img" width={300} height={300}/>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <Image src="/image/Group 969.png" alt="img" width={300} height={300}/>
                                        </div>
                                    </motion.div>

                                    {/* متن */}
                                    <motion.div
                                        className="mt-5 text-center"
                                        initial={{opacity: 0, y: 20}}
                                        whileInView={{opacity: 1, y: 0}}
                                        transition={{duration: 0.8, delay: 0.6}}
                                        viewport={{once: true}}
                                    >
                <span className="text-white text-3xl">
                با ما بهترین خود باشید، تن شما لایق بهترین‌ها است.
                </span>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* نسخه موبایل */}
                        <div className="mt-24 relative block md:hidden overflow-hidden">
                            <Image className="w-screen" src="/image/Group 962.png" alt="img" layout="responsive"
                                   width={900} height={500}/>
                            <div className="flex flex-col items-center justify-center">
                                {/* تصویر بالا */}
                                <motion.div
                                    className="absolute top-0 flex justify-center w-full"
                                    initial={{opacity: 0, y: -50}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.8}}
                                    viewport={{once: true}}
                                >
                                    <Image src="/image/Rectangle 262.png" alt="img" width={100} height={100}/>
                                </motion.div>

                                {/* دو تصویر پایینی */}
                                <motion.div
                                    className="flex w-full flex-col items-center absolute bottom-14"
                                    initial={{opacity: 0, y: 50}}
                                    whileInView={{opacity: 1, y: 0}}
                                    transition={{duration: 0.8, delay: 0.3}}
                                    viewport={{once: true}}
                                >
                                    <div className="flex justify-around items-center w-full px-5">
                                        <Image src="/image/Group 964.png" alt="img" width={110} height={100}/>
                                        <Image src="/image/Group 965.png" alt="img" width={110} height={100}/>
                                    </div>

                                    {/* متن */}
                                    <motion.div
                                        className="mt-3 text-center"
                                        initial={{opacity: 0, y: 20}}
                                        whileInView={{opacity: 1, y: 0}}
                                        transition={{duration: 0.8, delay: 0.6}}
                                        viewport={{once: true}}
                                    >
                <span className="text-red-50">
                با ما بهترین خود باشید، تن شما لایق بهترین‌ها است.
                </span>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </>
                )
            }


        </>
    );
}

export default Banneritem3;
