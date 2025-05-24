"use client"
import React from 'react';
import DetailPage from "@/components/client/template/DetailPage";
import Cookies from "js-cookie";
import axios from "axios";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import LoadingOrError from "@/components/client/module/LoadingOrError";

function page() {
    const params = useParams();
    const blogId = params.blogId;


    const fetchProduct = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get(`https://joppin.ir/api/v1/blog/${Number(blogId)}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            return res.data;
        } catch (error) {
            throw new Error(error?.response?.data?.message || 'خطا در دریافت اطلاعات محصول');
        }
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ['blog', blogId],
        queryFn: fetchProduct,
    });

    if (isLoading) return <LoadingOrError message="لطفا کمی صبر کنید..." />;
    if (error) return <LoadingOrError message="خطا در دریافت اطلاعات محصول" />;
    if (!data) return <LoadingOrError message="سرعت اینترنت پایین است" />;
    return (
        <>
            <DetailPage data={data}/>
        </>
    );
}

export default page;