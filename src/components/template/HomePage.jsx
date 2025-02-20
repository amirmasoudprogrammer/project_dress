import React from 'react';
import Banner from "@/components/template/Banner";
import SlideUser from "@/components/template/SlideUser";
import BannerItem2 from "@/components/template/BannerItem2";
import Categories from "@/components/template/Categories";

function HomePage(props) {
    return (
        <>
            <Banner/>
            <SlideUser/>
            <BannerItem2/>
            <Categories/>


        </>
    );
}

export default HomePage;