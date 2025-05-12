"use client"
import React, {useEffect, useState} from 'react';
import LoginAdmin from "@/components/admin/templates/LoginAdmin";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

function Page(props) {
    const router = useRouter();
    const [token, setToken] = useState(undefined);

    useEffect(() => {
        const storedToken = Cookies.get("tokenAdmin");
        if (storedToken) {
            router.replace("/Admin_Dashboard")
        } else {
            setToken(null);
        }
    }, [router]);

    if (token === undefined) {
        return null;
    }
    return (
     <LoginAdmin/>
    );
}

export default Page;