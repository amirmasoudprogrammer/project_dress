"use client";

import React, { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import { motion } from "framer-motion";
import Banner from "@/components/client/template/Banner";
import BannerItem2 from "@/components/client/template/BannerItem2";
import Categories from "@/components/client/template/Categories";
import BannerMain from "@/components/client/template/BannerMain";
import NewProduct from "@/components/client/template/NewProduct";
import Our_Products from "@/components/client/template/Our_Products";
import Blog from "@/components/client/template/Blog";
import Banneritem3 from "@/components/client/template/Banneritem3";

function HomePage(props) {
    useEffect(() => {
        setTimeout(() => {
            scroll.scrollTo(600, {
                duration: 2000, // مدت زمان اسکرول (1 ثانیه)
                smooth: "easeInOutQuad",
            });
        }, 600); // تأخیر برای زیبایی بیشتر
    }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <Banner />
            </motion.div>
            <BannerItem2 />
            <Categories />
            <BannerMain />
            <NewProduct />
            <Our_Products />
            <Banneritem3 />
            <Blog />
        </>
    );
}

export default HomePage;
