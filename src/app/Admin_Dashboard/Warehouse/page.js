"use client"
import React from 'react';
import WarehousePage from "@/components/admin/templates/WarehousePage";
import {useQuery} from "@tanstack/react-query";
import LoadingOrError from "@/components/client/module/LoadingOrError";
import Cookies from "js-cookie";
import axios from "axios";

function Page(props) {

    const fetchBanners = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get('https://joppin.ir/api/inventory', {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });
            return res.data;
        } catch (error) {
            throw new Error(error?.response?.data?.message || 'خطا در دریافت اطلاعات تیکت‌ها');

        }


    };

    const {data, error, isLoading} = useQuery({
        queryKey: ['inventory'],
        queryFn: fetchBanners
    });
    if (error) return <LoadingOrError message="خطا در سرور..."/>
    if (isLoading) return <LoadingOrError message="کمی صبرکنید ..."/>

    return (
        <WarehousePage data={data}/>
    );
}

export default Page;