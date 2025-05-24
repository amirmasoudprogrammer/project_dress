"use client"
import React, {useEffect, useState} from 'react';
import CardBlog from "@/components/client/module/CardBlog";
import Title from "@/components/client/template/Title";
import Cookies from "js-cookie";
import axios from "axios";


function BlogPage(props) {
    const [blog , setBlog] =useState([])
    useEffect(() => {
        const fetchBlog= async () => {
            try {
                const token = Cookies.get('tokenAdmin');
                const res = await axios.get(`https://joppin.ir/api/v1/blog`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                setBlog(res.data.data)
            } catch (error) {
                console.error(`Error fetching banners for:`, error);
            }
        };

        fetchBlog()
        const interval = setInterval(() => {
            fetchBlog()
        }, 5000);
        return () => clearInterval(interval);
    }, []);
console.log(blog)
    return (
        <>
            <div className="block md:hidden">
                <Title name="وبلاگ" />
            </div>
            <div className="container m-auto flex flex-col items-start justify-between mt-10 md:mt-16">
                {blog.map((items) => <CardBlog data={items} key={items.id} />)}
            </div>
        </>
    );
}

export default BlogPage;