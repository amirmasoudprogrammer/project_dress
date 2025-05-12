"use client"
import React, {useState, useRef} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "sonner";
import Cookies from "js-cookie";



const OtpInput = ({number}) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const router = useRouter();

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, ""); // فقط عدد بگیره
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // حرکت به اینپوت بعدی
        if (index < 5 && value) {
            inputRefs.current[index + 1]?.focus();
        }

        // اگر همه‌ی فیلدها پر شد، خودکار تایید کن
        if (newOtp.every((digit) => digit !== "")) {
            setTimeout(() => handleVerify(newOtp), 100);
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            if (otp[index]) {
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handleVerify = async (customOtp = otp) => {
        const code = customOtp.join(""); // بدون معکوس کردن
        console.log("کد ارسال شده:", code);

        if (code.length !== 6) {
            alert("کد باید ۶ رقمی باشد.");
            return;
        }

        try {
            const response = await axios.post("https://joppin.ir/api/v1/otp/verify", {
                phone_number: number,
                code: code,
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });


            console.log(response.data)
            if (response.data.message) {
                toast.success(response.data.message);
                Cookies.set("token", response.data.token, { expires: 7 });
                axios.interceptors.request.use((config) => {
                    const token = Cookies.get("token");
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                    return config;
                });
                setTimeout(() => {
                    router.push("/");
                }, 2000);


            } else {
                alert(response.data.message || "کد تایید نامعتبر است");
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.message || "مشکلی پیش آمده، دوباره تلاش کنید");
        }
    };

    return (
        <>
            <div className="flex flex-row-reverse items-center justify-center mt-10 mb-14">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={value}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="text-black border border-gray-400 rounded w-12 h-14 mx-1 text-center text-xl font-bold"
                    />
                ))}
            </div>

        </>
    );
};

export default OtpInput;
