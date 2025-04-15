"use client"
import React, {useEffect, useState} from 'react';

import {Toaster, toast} from 'sonner'
import CheckOtp from "@/components/client/template/CheckOtp";
import LoginForm from "@/components/client/module/LoginForm";


function Login(props) {
    const [number, setNumber] = useState("")
    const [rules, setRules] = useState(false)
    const [showOtp, setShowOtp] = useState(false)


    // useEffect(() => {
    //     const storedShowOtp = localStorage.getItem("showOtp");
    //     const storedNumber = localStorage.getItem("phoneNumber");
    //
    //     if (storedShowOtp === "true" && storedNumber) {
    //         setShowOtp(true);
    //         setNumber(storedNumber);
    //     }
    // }, []);


    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); //
        if (value.length <= 11 ) {
            setNumber(value);
        }
    }

    const handleCheckboxChange = (e) => {
        setRules(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (number.length === 0)  {
            toast.error("شمارتون وارد کنید")
        }else if (number.length !== 11){
            toast.error("شما شماره شما صحیح نمی باشد")
        } else if (!rules) {
            toast.error("برای ادامه باید قوانین را بپذیرید.");
        }
        else {
            toast.success('شماره شما صحیح هست ')
            setTimeout(() => {
                setShowOtp(true); //
                // localStorage.setItem("showOtp", "true"); // ذخیره وضعیت ورود به صفحه OTP
                // localStorage.setItem("phoneNumber", number); // ذخیره شماره کاربر
            }, 1000);
        }

    }

    return (
        <>
            <Toaster expand={true} position="top-center" richColors/>
            {
                showOtp ? <CheckOtp/> : <LoginForm handleSubmit={handleSubmit} handleCheckboxChange={handleCheckboxChange} handleChange={handleChange}/>
            }

        </>
    );
}

export default Login;
