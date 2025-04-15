"use client"
import React from 'react';
import {FaAngleUp} from "react-icons/fa6";
import Link from "next/link";
import Navigation from "@/components/client/layout/Navigation";
import { animateScroll as scroll } from "react-scroll";

function Footer(props) {

    return (
        <>
            <footer style={{
                backgroundImage: "url('/Rectangle 160.png')",
                backgroundSize: "cover",
                width: "100%",
                height: "80vh"
            }} className="hidden mt-60 md:flex relative flex flex-col items-center justify-start pt-10 text-white">
                <div className=" hidden md:flex items-center flex-col justify-center">
                    <div onClick={() => scroll.scrollToTop({ duration: 1000, smooth: "easeInOutQuad" })} className="w-[65px] flex items-center justify-center bg-[#6E8E59] relative -top-3 rounded-t-3xl p-5">
                        <button  onClick={() => scroll.scrollToTop({ duration: 1000, smooth: "easeInOutQuad" })}>
                            <FaAngleUp/>
                        </button>
                    </div>
                    <div
                        className="container px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-40 gap-16 text-center md:text-right ">
                        {/* درباره ما */}
                        <div>
                            <h2 className="relative w-[200px] text-sm mb-2 pb-3 border-b border-gray-400 inline-block">
                                الیزا
                                <span className="absolute right-0 -bottom-0 w-1/5 h-[3px] bg-white"></span>
                            </h2>
                            <p className="text-sm text-white">
                                مزون الیزا، یک‌شوروم (فروشگاه) لباس مجلسی و کژوال زنانه است که نزدیک به ۱۲سالی است در
                                زمینه
                                مد و پوشاک فعالیت می‌کند. برای سلیقه مشتریانش ارزش زیادی قائل می‌شود.
                            </p>
                        </div>

                        {/* لینک‌های مفید 1 */}
                        <div className="mr-10">
                            <h2 className="relative w-[200px] text-sm mb-2 pb-3 border-b border-gray-400 inline-block">
                                لینک های مفید
                                <span className="absolute right-0 -bottom-0 w-1/5 h-[3px] bg-white"></span>
                            </h2>
                            <ul className="text-sm text-white space-y-3">
                                <li className=""><Link href="/Contact"
                                                       className="relative text-sm w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center ">تماس
                                    با ما</Link></li>
                                <li className=""><Link href="@/components/client/layout/Footer"
                                                       className="relative text-sm w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">محصولات
                                    ما</Link></li>
                                <li className=""><Link href="/Login&Registration"
                                                       className="relative text-sm w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">ورود
                                    و ثبت نام</Link></li>
                                <li className=""><Link href="@/components/client/layout/Footer"
                                                       className="relative text-sm w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-centere">درباره
                                    ما</Link></li>
                                <li className=""><Link href="@/components/client/layout/Footer"
                                                       className="relative text-sm w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">وبلاگ</Link>
                                </li>
                            </ul>
                        </div>

                        {/* لینک‌های مفید 2 */}
                        <div>
                            <h2 className="relative w-[200px] text-sm mb-2 pb-3 border-b border-gray-400 inline-block">
                                آخرین مطالب وبلاگ
                                <span className="absolute right-0 -bottom-0 w-1/5 h-[3px] bg-white"></span>
                            </h2>
                            <ul className="text-sm text-white space-y-4">
                                <li><Link href="@/components/client/layout/Footer"
                                          className="relative text-sm w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center ">تیم
                                    کارکنان</Link></li>
                                <li><Link href="@/components/client/layout/Footer"
                                          className="relative text-sm w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">درخواست
                                    همکاری</Link></li>
                                <li><Link href="@/components/client/layout/Footer"
                                          className="relative text-sm w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">فروشگاه
                                    ما</Link></li>
                                <li><Link href="@/components/client/layout/Footer"
                                          className="relative text-sm w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-centere">محصولات
                                    ما</Link></li>
                            </ul>
                        </div>

                        {/* ارتباط با ما */}
                        <div>
                            <h2 className="relative w-[200px] text-sm mb-2   pb-3 border-b border-gray-400 inline-block">
                                ارتباط با ما
                                <span className="absolute right-0   -bottom-0 w-1/5 h-[3px] bg-white"></span>
                            </h2>

                            <p className="text-sm text-white">
                                آدرس فروشگاه: تهران، نیاوران، اطلس مال، طبقه G2، واحد 2053
                                <br/>
                                آدرس: تهران، شهید قندی – نیلوفر، خیابان شهید عبدالمجید صابونچی
                                <br/>
                                تلفن: 021-26372651 | 021-26379841
                                <br/>
                                ایمیل: eliza@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </footer>


            <footer style={{
                backgroundImage: "url('/Rectangle 160.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "auto",
                position: "relative"
            }} className="md:hidden mt-60 flex flex-col items-center relative  justify-start pt-10 text-white">


                <div className="relative z-10 flex items-center flex-col justify-center w-full pb-16">
                    <div
                        className="w-[65px] flex items-center justify-center bg-[#6E8E59] relative -top-3 rounded-t-3xl p-5">
                        <button onClick={() => scroll.scrollToTop({ duration: 1000, smooth: "easeInOutQuad" })}>
                            <FaAngleUp/>
                        </button>
                    </div>

                    <div
                        className="container px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 gap-10 text-center md:text-right">
                        {/* درباره ما */}
                        <div>
                            <h2 className="relative w-[200px] text-sm mb-2 pb-3 border-b border-gray-400 inline-block">
                                الیزا
                                <span className="absolute right-0 -bottom-0 w-1/5 h-[3px] bg-white"></span>
                            </h2>
                            <p className="text-sm text-white">
                                مزون الیزا، یک‌شوروم (فروشگاه) لباس مجلسی و کژوال زنانه است که نزدیک به ۱۲سالی است در
                                زمینه مد و پوشاک فعالیت می‌کند. برای سلیقه مشتریانش ارزش زیادی قائل می‌شود.
                            </p>
                        </div>

                        {/* لینک‌های مفید */}
                        <div className="flex justify-between">
                            <div>
                                <h2 className="relative md:w-[200px] text-[12px] mb-2 pb-3 border-b border-gray-400 inline-block">
                                    لینک های مفید
                                    <span className="absolute right-0 -bottom-0 w-1/5 h-[3px] bg-white"></span>
                                </h2>
                                <ul className="text-sm text-white space-y-3">
                                    <li><Link href="/Contact">تماس با ما</Link></li>
                                    <li><Link href="@/components/client/layout/Footer">محصولات ما</Link></li>
                                    <li><Link href="/Login&Registration">ورود و ثبت نام</Link></li>
                                    <li><Link href="@/components/client/layout/Footer">درباره ما</Link></li>
                                    <li><Link href="@/components/client/layout/Footer">وبلاگ</Link></li>
                                </ul>
                            </div>

                            {/* آخرین مطالب وبلاگ */}
                            <div>
                                <h2 className="relative   md:w-[200px] text-[12px] mb-2 pb-3 border-b border-gray-400 inline-block">
                                    آخرین مطالب وبلاگ
                                    <span className="absolute right-0 -bottom-0 w-1/5 h-[3px] bg-white"></span>
                                </h2>
                                <ul className="text-sm text-white space-y-4">
                                    <li><Link href="@/components/client/layout/Footer">تیم کارکنان</Link></li>
                                    <li><Link href="@/components/client/layout/Footer">درخواست همکاری</Link></li>
                                    <li><Link href="@/components/client/layout/Footer">فروشگاه ما</Link></li>
                                    <li><Link href="@/components/client/layout/Footer">محصولات ما</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* ارتباط با ما */}
                        <div className="flex flex-col items-start justify-start">
                            <h2 className="relative w-[200px] text-right text-sm mb-2 pb-3 border-b border-gray-400 inline-block">
                                ارتباط با ما
                                <span className="absolute right-0 -bottom-0 w-1/5 h-[3px] bg-white"></span>
                            </h2>
                            <p className="text-sm text-white text-right">
                                آدرس فروشگاه: تهران، نیاوران، اطلس مال، طبقه G2، واحد 2053<br/>
                                آدرس: تهران، شهید قندی – نیلوفر، خیابان شهید عبدالمجید صابونچی<br/>
                                تلفن: 021-26372651 | 021-26379841<br/>
                                ایمیل: eliza@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </footer>


            <Navigation/>
        </>
    );
}

export default Footer;