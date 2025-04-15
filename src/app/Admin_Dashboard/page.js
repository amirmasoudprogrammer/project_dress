"use client";
import React, {useEffect} from 'react';
import { useRouter } from "next/navigation";


function Page(props) {
    const router = useRouter();

    useEffect(() => {
        router.replace("/Admin_Dashboard/Dashboard/DashboardOne");
    }, []);
    return null
}

export default Page;