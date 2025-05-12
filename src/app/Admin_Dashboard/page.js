"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function Page() {
    const router = useRouter();
    const [tokenChecked, setTokenChecked] = useState(false);

    useEffect(() => {
        const storedToken = Cookies.get("tokenAdmin");

        if (storedToken) {
            router.replace("/Admin_Dashboard");
        } else {
            router.replace("/");
        }

        setTokenChecked(true);
    }, [router]);

    if (!tokenChecked) return null;

    return null;
}

export default Page;
