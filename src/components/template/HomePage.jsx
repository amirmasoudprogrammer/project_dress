"use client";

import React, { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import { motion } from "framer-motion";
import Banner from "@/components/template/Banner";
import BannerItem2 from "@/components/template/BannerItem2";
import Categories from "@/components/template/Categories";
import BannerMain from "@/components/template/BannerMain";
import NewProduct from "@/components/template/NewProduct";
import Our_Products from "@/components/template/Our_Products";
import Blog from "@/components/template/Blog";
import Banneritem3 from "@/components/template/Banneritem3";

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
