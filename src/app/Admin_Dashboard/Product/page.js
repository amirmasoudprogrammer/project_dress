"use client"
import React from 'react';
import ProductPage from "@/components/admin/templates/ProductPage";
import {useQuery} from "@tanstack/react-query";
import LoadingOrError from "@/components/client/module/LoadingOrError";
import Cookies from "js-cookie";
import axios from "axios";

function Page(props) {
    const fetchTickets = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get('https://joppin.ir/api/v1/products', {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            return res.data;
        } catch (error) {
            throw new Error(error?.response?.data?.message || 'خطا در دریافت اطلاعات محصولات');
        }
    };

    const {data, error, isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: fetchTickets
    });

    if (error) return <LoadingOrError message={error.message || "خطا در سرور..."}/>
    if (isLoading) return <LoadingOrError message="کمی صبرکنید ..."/>

    return (
        <ProductPage data={data}/>
    );
}

export default Page;

