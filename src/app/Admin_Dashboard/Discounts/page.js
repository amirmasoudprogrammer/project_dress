"use client"
import React from 'react';
import DiscountsPage from "@/components/admin/templates/DiscountsPage";
import {useQuery} from "@tanstack/react-query";
import LoadingOrError from "@/components/client/module/LoadingOrError";
import axios from "axios";
import Cookies from "js-cookie";

function Page(props) {
    const fetchBanners = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get('https://joppin.ir/api/v1/admin/discounts',{
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            return res.data;
        }catch (error) {
            throw new Error(error?.response?.data?.message || 'خطا در دریافت اطلاعات تیکت‌ها');
        }


    };

    const {data, error, isLoading} = useQuery({
        queryKey: ['discounts'],
        queryFn: fetchBanners
    });
    if (error) return <LoadingOrError message="خطا در سرور..."/>
    if (isLoading) return <LoadingOrError message="کمی صبرکنید ..."/>
    console.log(data)
    return (
        <DiscountsPage data={data}/>
    );
}

export default Page;