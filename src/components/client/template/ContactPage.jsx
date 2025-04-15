"use client"
import React,{useState} from 'react';
import { TbHeadset } from "react-icons/tb";

function ContactPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    return (
        <div className="mt-16 container m-auto px-4">
            <div className="md:p-10 mb-20 md:mb-48">
                <div className="flex items-center">
                    <TbHeadset color="black" size={30} />
                    <span className="text-black text-xl mr-2">فرم تماس با ما</span>
                </div>
                <p className="text-sm md:text-lg mt-2 mb-2 text-[#626262] font-normal">
                    در کنار روش‌های ارتباطی که در نظر گرفتیم، شما می‌توانید از طریق فرم زیر پیام‌های خود را برای ما ارسال کنید.
                </p>
                <form className="mt-10 flex flex-col items-start" action="@/components/client/template/ContactPage">
                    <div className="flex flex-col w-full max-w-[900px]">
                        <label className="text-black mb-1" htmlFor="name">نام</label>
                        <input
                            className="w-full h-[42px] text-black outline-0 border rounded-lg border-gray-300 px-2"
                            type="text" placeholder="نام خود را وارد کنید" id="name" name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-full max-w-[900px] mt-5">
                        <label className="text-black mb-1" htmlFor="email">ایمیل</label>
                        <input
                            className="w-full h-[42px] text-black outline-0 border rounded-lg border-gray-300 px-2"
                            type="email" placeholder="ایمیل خود را وارد کنید" id="email" name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-full max-w-[900px] mt-5">
                        <label className="text-black mb-1" htmlFor="message">متن پیام</label>
                        <textarea
                            placeholder="متن خودتون رو برای ما ارسال کنید" id="message" name="message"
                            className="w-full h-[129px] text-black outline-0 border rounded-lg border-gray-300 px-2"
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex justify-center mt-5 m-auto  relative md:right-56">
                        <button className="w-[100px] md:w-[186px] h-[42px] bg-[#6E8E59] text-white rounded-lg" type="submit">
                            ارسال پیام
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;
