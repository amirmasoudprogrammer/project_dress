import React from 'react';
import Link from "next/link";
import Image from "next/image";


function Header(props) {
    return (
        <header>
            <div className="container z-10 relative mt-2 m-auto flex flex-col justify-between items-end hidden md:flex">
                <div className="container z-10 relative  m-auto flex justify-between items-center hidden md:flex">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center justify-center w-20 m-0">
                            <Image src="/Group 946.svg" alt="Bag Icon" width={90} height={90}/>
                        </Link>
                        <div className="flex items-center justify-between ">
                            <ul className="flex justify-between items-center">
                                <li className="mr-5"><Link href=""
                                                           className="text-black w-full relative flex justify-between flex-wrap gap-3 ">
                                    <p className="text-lg  group relative w-max">
                                        <span className="font-normal text-sm"> صفحه اصلی</span>
                                        <span
                                            className="absolute -bottom-1 right-0 w-0 transition-all h-0.5 bg-slate-50 group-hover:w-full"></span>
                                    </p>


                                </Link></li>
                                <li className="mr-5"><Link href=""
                                                           className="text-black  w-full relative flex justify-between flex-wrap gap-3 ">
                                    <p className="text-lg  group relative w-max">
                                        <span className="font-normal text-sm"> محصولات  ما</span>
                                        <span
                                            className="absolute -bottom-1 right-0 w-0 transition-all h-0.5 bg-slate-50 group-hover:w-full"></span>
                                    </p>


                                </Link></li>
                                <li className="mr-5">
                                    <Link href="" className="text-black w-full relative flex justify-between flex-wrap gap-3 ">
                                    <p className="text-lg  group relative w-max">
                                        <span className="font-normal text-sm"> درباره ما</span>
                                        <span
                                            className="absolute -bottom-1 right-0 w-0 transition-all h-0.5 bg-slate-50 group-hover:w-full"></span>
                                    </p>


                                </Link>
                                </li>
                                <li className="mr-5"><Link href=""
                                                           className="text-black w-full relative flex justify-between flex-wrap gap-3 ">
                                    <p className="text-lg  group relative w-max">
                                        <span className="font-normal text-sm"> تماس با ما</span>
                                        <span
                                            className="absolute -bottom-1 right-0 w-0 transition-all h-0.5 bg-slate-50 group-hover:w-full"></span>
                                    </p>


                                </Link></li>
                                <li className="mr-5"><Link href=""
                                                           className="text-black w-full relative flex justify-between flex-wrap gap-3 ">
                                    <p className="text-lg  group relative w-max">
                                        <span className="font-normal text-sm"> فروشگاه ما</span>
                                        <span
                                            className="absolute -bottom-1 right-0 w-0 transition-all h-0.5 bg-slate-50 group-hover:w-full"></span>
                                    </p>


                                </Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center justify-between ">
                        <Link href="">
                            <div
                                className='bg-slate-200 shadow-lg  p-3 mr-4 rounded-full flex items-center justify-center'>
                                <Image src="/Group 9.svg" alt="Bag Icon" width={20} height={20}/>
                            </div>
                        </Link>
                        <Link href="">
                            <div
                                className='bg-slate-200 shadow-lg p-3 mr-4 rounded-full flex items-center justify-center'>
                                <Image src="/Sun.svg" alt="Bag Icon" width={24} height={24}/>
                            </div>
                        </Link>
                        <Link href="">
                            <div
                                className=" bg-slate-200 shadow-lg p-3 mr-4 rounded-full flex items-center justify-center">
                                <Image src="/Profile Add 1.svg" alt="Bag Icon" width={24} height={24}/>
                            </div>
                        </Link>
                        <Link href="">
                            <div
                                className=" bg-slate-200 shadow-lg p-3 mr-4 rounded-full flex items-center justify-center">
                                <Image src="/Bag 1.svg" alt="Bag Icon" width={24} height={24}/>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex mt-5 bg-slate-50 p-2 rounded w-[350px]">
                    <Image src="/Search-01.svg" alt="Bag Icon" width={20} height={20}/>
                    <input type="text" className="w-[350px] outline-0 text-black pr-2" placeholder=""/>
                </div>
            </div>


        </header>
    );
}

export default Header;