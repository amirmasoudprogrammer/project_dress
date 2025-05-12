"use client"
import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import CheckOtp from "@/components/client/template/CheckOtp";
import LoginForm from "@/components/client/module/LoginForm";

function Login(props) {
    const [number, setNumber] = useState("");
    const [rules, setRules] = useState(false);
    const [showOtp, setShowOtp] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 11) {
            setNumber(value);
        }
    }

    const handleCheckboxChange = (e) => {
        setRules(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (number.length === 0) {
            toast.error("شمارتون وارد کنید");
        } else if (number.length !== 11) {
            toast.error("شماره شما صحیح نمی باشد");
        } else if (!rules) {
            toast.error("برای ادامه باید قوانین را بپذیرید.");
        } else {
            try {
                const response = await fetch("https://joppin.ir/api/v1/otp/send", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ phone_number: number }),
                });

                const data = await response.json();

                if (response.ok) {
                    toast.success("کد تایید ارسال شد!");
                    setTimeout(() => {
                        setShowOtp(true);
                    }, 500);
                } else {
                    toast.error(data.message || "خطایی رخ داده است.");
                }
            } catch (error) {
                console.error(error);
                toast.error("مشکل در ارتباط با سرور");
            }
        }
    }

    return (
        <>
            <Toaster expand={true} position="top-center" richColors/>
            {
                showOtp
                    ? <CheckOtp number={number} />
                    : <LoginForm
                        handleSubmit={handleSubmit}
                        handleCheckboxChange={handleCheckboxChange}
                        handleChange={handleChange}
                    />
            }
        </>
    );
}

export default Login;
