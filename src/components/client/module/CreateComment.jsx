"use client"
import React, {useState} from 'react';
import {BsVectorPen} from "react-icons/bs";
import {CiUser} from "react-icons/ci";
import axios from "axios";
import Cookies from "js-cookie";
import {toast, Toaster} from "sonner";

function CreateComment({id}) {
    const [view, setView] = useState("")
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")

    const startSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append("comment", view)
        try {
            const token = Cookies.get('token');
            const res = await axios.post(`https://joppin.ir/api/products/${id}/comments`, form, {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            })
            if (res.status === 201){
                toast.success("کامنت فرستاده شد.. ");
                setView("")
                setUser("")
                setEmail("")
            }
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <div className="mt-20">
            <Toaster expand={true} position="top-center" richColors/>
            <form action="" onSubmit={startSubmit} className="flex flex-col items-start md:items-center mr-3 md:mr-0">
                <div className="flex flex-col items-start">
                    <div className="flex items-center text-black">
                        <BsVectorPen/>
                        <label htmlFor="view" className="text-black mr-3 text-[16px]">دیدگاه خود راشرح دهید</label>
                    </div>
                    <input type="text" id={view} name={view}
                           className="w-[312px]  md:w-[744px] h-[67px] mt-5 rounded-lg pr-2 text-black border border-[#626262]"
                           placeholder="نظرات وسوالات شما" value={view} onChange={(e) => setView(e.target.value)}/>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center mt-5 md:mt-10">
                    <div className="flex flex-col items-start">
                        <div className="flex text-black items-center">
                            <CiUser/>
                            <label htmlFor="user" className="mr-2">نام کاربری</label>
                        </div>
                        <input type="text" id={user} name={user}
                               className="border mt-2 w-[312px] md:w-[360px] h-[67px] rounded-lg text-black border-[#626262]"
                               placeholder="نام کاربری" value={user}
                               onChange={(e) => setUser(e.target.value)}/>
                    </div>
                    <div className="flex flex-col items-start mt-5 md:mt-0 md:mr-10">
                        <div className="flex text-black items-center">
                            <span>@</span>
                            <label htmlFor="email" className="mr-2">ایمیل</label>
                        </div>
                        <input type="email" id={email} name={email}
                               className="border mt-2 w-[312px] md:w-[360px] h-[67px] rounded-lg text-black border-[#626262]"
                               placeholder="ایمیل" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div
                    className="w-[312px] md:w-[744px] h-[67px] bg-[#6E8E59] mt-10 flex items-center justify-center rounded cursor-pointer">
                    <button type="submit">افزودن دیدگاه</button>
                </div>
            </form>
        </div>
    );
}

export default CreateComment;