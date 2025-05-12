"use client"
import React from 'react';
import Comments from "@/components/admin/modules/Comments";
import {useQuery} from "@tanstack/react-query";
import LoadingOrError from "@/components/client/module/LoadingOrError";
import axios from "axios";
import Cookies from "js-cookie";

function Page(props) {
    const fetchComments = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get('https://joppin.ir/api/v1/comments/all',{
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            return res.data
        }catch (error) {
            throw new Error(error?.response?.data?.message || 'خطا در دریافت اطلاعات تیکت‌ها');

        }


    };

    const {data, error, isLoading} = useQuery({
        queryKey: ['comments'],
        queryFn: fetchComments
    });
    if (error) return <LoadingOrError message="خطا در سرور..."/>
    if (isLoading) return <LoadingOrError message="کمی صبرکنید ..."/>
console.log(data)

    return (
        <Comments data={data}/>
    );
}

export default Page;