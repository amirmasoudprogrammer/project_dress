"use client";

import React, { useEffect, useState } from 'react';
import Login from "@/components/client/template/Login";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Page() {
    const router = useRouter();
    const [token, setToken] = useState(undefined);

    useEffect(() => {
        const storedToken = Cookies.get("token");
        if (storedToken) {
            router.replace("/User_Dashboard")
        } else {
            setToken(null);
        }
    }, [router]);

    if (token === undefined) {
        return null;
    }

    return (
        <Login/>
    );
}

export default Page;
