"use client";
import React, {useEffect} from 'react';
import { useRouter } from "next/navigation";


function Page(props) {
    const router = useRouter();

    useEffect(() => {
        router.replace("/User_Dashboard/orders/current");
    }, []);
    return null
}

export default Page;