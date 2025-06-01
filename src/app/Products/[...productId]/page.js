'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import ProductsDetail from '@/components/client/template/ProductsDetail';
import LoadingOrError from '@/components/client/module/LoadingOrError';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function Page() {
    const params = useParams();
    console.log(params)
    const productId = params.productId?.[0]; // id از آدرس
    const slug = params.productId?.[1]; // name یا slug از آدرس

    const fetchProduct = async () => {
        try {
            const token = Cookies.get('token');
            const res = await axios.get(`https://joppin.ir/api/v1/products/${Number(productId)}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            return res.data;
        } catch (error) {
            throw new Error(error?.response?.data?.message || 'خطا در دریافت اطلاعات محصول');
        }
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ['product', productId],
        queryFn: fetchProduct,
    });

    if (isLoading) return <LoadingOrError message="لطفا کمی صبر کنید..." />;
    if (error) return <LoadingOrError message="خطا در دریافت اطلاعات محصول" />;
    if (!data) return <LoadingOrError message="سرعت اینترنت پایین است" />;

    return <ProductsDetail data={data} slug={slug} />;
}

export default Page;
