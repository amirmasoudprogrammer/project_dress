import React, { useState, useRef, useEffect } from "react";

const OtpInput = () => {
    const [otp, setOtp] = useState(["", "", "", "", ""]);
    const inputRefs = useRef([]);

    // فوکوس خودکار روی اینپوت سمت راست
    useEffect(() => {
        if (inputRefs.current[otp.length - 1]) {
            inputRefs.current[otp.length - 1].focus();
        }
    }, []);

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/\D/g, ""); // فقط عدد
        const newOtp = [...otp];

        if (value) {
            newOtp[index] = value;
            setOtp(newOtp);
            if (index > 0) {
                inputRefs.current[index - 1]?.focus(); // بعد از وارد کردن، به اینپوت سمت چپ برود
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            const newOtp = [...otp];
            if (otp[index]) {
                newOtp[index] = ""; // مقدار را پاک کن
            } else if (index < otp.length - 1) {
                newOtp[index + 1] = ""; // مقدار بعدی را هم پاک کن
                inputRefs.current[index + 1]?.focus(); // به سمت راست برو
            }
            setOtp(newOtp);
        }
    };

    return (
        <div className="flex flex-row-reverse  items-center justify-center mt-10 mb-14">
            {otp.map((value, index, arr) => (
                <input
                    key={arr.length - index - 1} // ترتیب معکوس
                    type="text"
                    maxLength="1"
                    placeholder="-"
                    value={otp[arr.length - index - 1]} // مقدار را از راست به چپ بگیر
                    ref={(el) => (inputRefs.current[arr.length - index - 1] = el)} // ترتیب فوکوس معکوس
                    onChange={(e) => handleChange(e, arr.length - index - 1)}
                    onKeyDown={(e) => handleKeyDown(arr.length - index - 1, e)}
                    className={` text-white outline-0 border border-gray-500 ml-2 rounded w-[48px] h-[64px] text-center font-bold text-xl 
                        ${otp[arr.length - index - 1] ? "bg-[#6E8E59]" : "bg-white"}`} // ✅ تغییر رنگ هنگام پر شدن
                />
            ))}
        </div>
    );
};

export default OtpInput;
