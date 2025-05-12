import React from 'react';
import Image from "next/image";

function LoginForm({handleCheckboxChange ,handleChange,handleSubmit}) {
    return (
        <>
            <div className="mt-16 items-center justify-between hidden md:flex">

                <div className="flex flex-col items-center justify-center w-[800px] mb-28">
                    <div className="flex items-center justify-center ">
                        <Image src="/image/Group 946.png" className="object-cover  " width={192} height={192}
                               alt="image"/>
                    </div>

                    <form className="flex flex-col items-start justify-center" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="login" className="text-black text-2xl mb-16 font-normal">ورود / ثبت
                                نام </label>
                            <input className="w-[528px] text-black outline-0 pr-5 h-[56px] border border-gray-400"
                                   id="login" name="login" placeholder="شماره موبایل خود را وارد کنید" type="number"
                                   onChange={handleChange}/>
                        </div>
                        <div className="flex items-center justify-center mt-3">
                            <input type="checkbox" name="Rules" id="Rules" onChange={handleCheckboxChange}/>
                            <label htmlFor="Rules" className="text-black mr-2"><span className="text-[#3083FF]">قوانین و مقررات</span> سایت
                                الیزا را می پذیرم.</label>
                        </div>
                        <div className="w-[528px] h-[56px] bg-[#6E8E59] flex items-center justify-center mt-14">
                            <button className="w-[528px] h-[56px]" type="submit">ورود کاربر
                            </button>
                        </div>
                    </form>
                </div>
                <div className="">
                    <Image src="/image/Group 21.png" className="object-cover w-full h-[100vh] -mt-16" width={500}
                           height={500}
                           alt="image"/>
                </div>
            </div>

            <div style={{
                backgroundImage: "url('image/Group 21.png')",
                backgroundSize: "cover",
                width: "100%",
                height: "100vh"
            }} className="flex items-center justify-between  md:hidden">
                <div
                    className="flex flex-col items-center justify-around backdrop-blur-md bg-white/30 border border-white/20 rounded-xl shadow-md w-[360px] m-auto  h-[499px] mb-28">
                    <div className="flex items-center justify-center ">
                        <Image src="/image/Group 946.png" className="object-cover  " width={80} height={80} alt="image"/>
                    </div>

                    <form className="flex flex-col items-start justify-center" onSubmit={handleSubmit}>
                        <div className="flex flex-col items-center justify-center">
                            <label htmlFor="login" className="text-black text-xl mb-16 font-normal">ورود / ثبت
                                نام </label>
                            <input className="w-[312px] text-black outline-0 pr-5 h-[56px] border border-gray-400"
                                   id="login" name="login" placeholder="شماره موبایل خود را وارد کنید" type="number"
                                   onChange={handleChange}/>
                        </div>
                        <div className="flex items-center justify-center mt-3">
                            <input type="checkbox" name="Rules" id="Rules" onChange={handleCheckboxChange}/>
                            <label htmlFor="Rules" className="text-black mr-2"><span className="text-[#3083FF]">قوانین و مقررات</span> سایت
                                الیزا را می پذیرم.</label>
                        </div>
                        <div className="w-[312px] h-[51px] bg-[#6E8E59] flex items-center justify-center mt-14">
                            <button className="" type="submit">ورود کاربر</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginForm;