"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function UserGuard({ children }) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/");
        } else {
            setChecked(true);
        }
    }, [router]);

    if (!checked) return null;

    return children;
}
