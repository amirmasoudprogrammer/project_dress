"use client"
import React from 'react';
import TicketPageAll from "@/components/client/module/TicketPageAll";
import {useQuery} from "@tanstack/react-query";
import LoadingOrError from "@/components/client/module/LoadingOrError";

function Page(props) {

    const fetchBanners = async () => {
        const res = await fetch('https://joppin.ir/api/v1/user/tickets');
        if (!res.ok) throw new Error('خطا در دریافت اطلاعات بنرها');
        return res.json();
    };
    const {data, error, isLoading} = useQuery({
        queryKey: ['tickets'],
        queryFn: fetchBanners
    });
    if (error) return <LoadingOrError message="خطا در سرور..."/>;
    if (isLoading) return <LoadingOrError message="کمی صبر کنید..."/>;

    return (
        <>
            <TicketPageAll data={data}/>

        </>
    );
}

export default Page;