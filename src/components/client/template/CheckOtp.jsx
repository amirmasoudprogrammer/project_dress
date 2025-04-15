"use client";
import React, {useState} from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import CountdownTimer from "@/components/client/module/CountdownTimer";
import OtpInput from "@/components/client/module/OtpInput";
import Link from "next/link";

function CheckOtp(props) {
    const router = useRouter();
    const [time, setTime] = useState(3 * 60); // 3 دقیقه (180 ثانیه)
    return (
        <div className="md:w-[392px] h-auto md:h-[580px] m-auto flex flex-col items-center justify-around relative md:top-20 bottom-0 border-l border-t border-r md:border-gray-600 rounded-lg overflow-visible md:before:content-[''] md:before:border-b md:before:border-black md:before:absolute md:before:bottom-[-30px] md:before:left-1/2 md:before:-translate-x-1/2 md:before:w-[390px] md:before:h-[80px] md:before:bg-white md:before:rounded-b-[60%] md:before:shadow-md">

        <div style={{
                backgroundImage: "url('/Rectangle 106.svg')",
                width: "100%",
                height: "150px"
            }} className=" flex items-center justify-center rounded">
                <Image src="/Group 946.png" className="object-cover" width={120} height={120} alt="image"/>
            </div>
            <div className="mt-16 flex flex-col items-center justify-center">
                <div><CountdownTimer time={time} setTime={setTime}/></div>
                <span className="text-black mt-10">کد تایید ارسال شده به شماره ۰9125859000 را وارد.</span>
            </div>
            <div>
                <OtpInput/>
            </div>
            <div className="flex items-center justify-center mb-20" onClick={() => router.back()}>
                <Link href="/Login&Registration" className="text-blue-500">ویرایش شماره</Link>
            </div>
        </div>
    );
}

export default CheckOtp;