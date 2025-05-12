"use client"
import React, {useEffect, useState} from 'react';
import UserPage from "@/components/client/template/UserPage";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

function Page(props) {
    const router = useRouter();
    const [tokenChecked, setTokenChecked] = useState(false);

    useEffect(() => {
        const storedToken = Cookies.get("token");

        if (storedToken) {
            router.replace("/User_Dashboard");
        } else {
            router.replace("/Login_Registration");
        }

        setTokenChecked(true);
    }, [router]);

    if (!tokenChecked) return null;
    return (
        <>
            <UserPage/>
        </>
    );
}

export default Page;