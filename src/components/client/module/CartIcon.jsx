"use client"
import React from 'react';
import {useSelector} from "react-redux";

function CartIcon(props) {
    const state = useSelector((state) => state.cart);

    return (
        <div className="absolute flex items-center justify-center top-0 right-8 bg-black dark:bg-red-50 dark:text-black w-[15px] h-[15px] rounded-full">
            <span className="text-sm">{state.itemsCounter}</span>
        </div>
    );
}

export default CartIcon;