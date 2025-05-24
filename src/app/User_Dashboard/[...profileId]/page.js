"use client";
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import axios from "axios";
import ProfileUser from "@/components/client/template/ProfileUser";

function Page() {
    const [user, setUser] = useState(null);

    const fetchUserProfile = async () => {
        try {
            const token = Cookies.get('token');
            const res = await axios.get("https://joppin.ir/api/v1/user/profile", {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            setUser(res.data.data);
        } catch (error) {
            console.error("خطا در دریافت اطلاعات کاربر:", error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return <ProfileUser data={user} onProfileUpdated={fetchUserProfile} />;
}

export default Page;
