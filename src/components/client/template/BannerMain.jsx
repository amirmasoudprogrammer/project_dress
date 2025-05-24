'use client'

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";

function BannerMain() {
    const [bannerMain, setBannersMain] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                const res = await axios.get(`https://joppin.ir/api/banners/position/3`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                setBannersMain(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mt-24 space-y-4">
            {bannerMain.map((item) => (
                <Link key={item.id} href="/products">
                    <Image
                        className="w-full h-auto object-cover"
                        src={item.image}
                        alt={item.alt || "Banner"}
                        width={1920}
                        height={600}
                    />
                </Link>
            ))}
        </div>
    );
}

export default BannerMain;
