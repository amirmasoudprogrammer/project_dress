"use client"
import React, {useEffect, useState} from 'react';
import {useGetProductsQuery} from "@/redux/features/api/apiSlice";
import {useParams} from "next/navigation";
import ProductsDetail from "@/components/client/template/ProductsDetail";
import LoadingOrError from "@/components/client/module/LoadingOrError";

function Page() {
    const params = useParams();
    const productId = params.productId;
    const [product, setProduct] = useState(null);
    const {data, error, isLoading} = useGetProductsQuery();
    useEffect(() => {
        if (data) {
            const foundProduct = data.find((product) => product.id === Number(productId));
            console.log(foundProduct)
            setProduct(foundProduct || null);
        }
    }, [data, productId]);


    if (isLoading) return <LoadingOrError message="لطفا کمی صبر کنید.."/>;
    if (error) return <LoadingOrError message="خطا در سرویس اطلاعات"/>;
    if (!product) return <LoadingOrError message="سرعنت اینترنت پایین است"/>
    return (
        <ProductsDetail data={product}/>
    );
}

export default Page;