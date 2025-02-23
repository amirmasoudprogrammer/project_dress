import React from 'react';
import Image from "next/image";
import {IoIosHeart} from "react-icons/io";
import {FaCartShopping} from "react-icons/fa6";
import Link from "next/link";
import { CiBookmark } from "react-icons/ci";
import {ConvertCurrency, Text} from "@/helper/text";

function CardProduct({data}) {
    const {title,image ,price} = data


    return (
        <>
            <div className="flex flex-col items-center justify-center border border-slate-300">
                <div className="flex items-center justify-between  flex-col">
                    <div className="absolute top-30 mt-3 right-6">
                        <IoIosHeart color="black"/>
                    </div>
                    <div>
                        <Image
                            className=""
                            src={image || "/Rectangle 150.png"}
                            alt={name || "محصول بدون نام"}
                            width={300}
                            height={200}
                        />

                        <div className="absolute  bottom-32 flex items-center  justify-between w-[100px] left-5  md:left-12">

                            <Link href=""
                                  className=" shadow-lg text-2xl text-black bg-slate-200 w-7 h-7 flex items-center justify-center p-2 rounded-full ">+</Link>
                            <div className="  md:mr-24">
                                <FaCartShopping color="black"/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>




            <div className=" w-full h-[113px] flex flex-col items-start border border-slate-300 ">
                <div className=" pt-5  flex items-center justify-start md:mr-5">
                    <div className="mr-3 md:mr-0">
                        <CiBookmark size="20" color="black" />
                    </div>
                    <span className="text-black text-sm mr-5">{Text(title)}</span>

                </div>
                <span className=" m-auto md:mr-14 mt-5 text-sm text-red-500">  {ConvertCurrency(price)}  <strong className="text-black mr-2">تومان</strong> </span>
            </div>
        </>
    );
}

export default CardProduct;