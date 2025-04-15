"use client"
import React, {useState} from 'react';
import ShoppingCard from "@/components/client/template/ShoppingCard";
import ShippingInfo from "@/components/client/template/ShippingInfo";
import Layout from "@/app/Shopping_Cart/layout";
import {useSelector} from "react-redux";


function Page(props) {
    const step = useSelector((state) => state.step.step);
    return (
        <>
            {step === 1 && <ShoppingCard  />}
            {step === 2 && <ShippingInfo  />}

        </>
    );
}

export default Page;