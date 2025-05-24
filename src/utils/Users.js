import {FaRegUser} from "react-icons/fa";
import {IoBagOutline} from "react-icons/io5";
import React from "react";





const menuItems = [
    {name: "صفحه اصلی", href: "/"},
    {name: "محصولات ما", href: "/Products"},
    {name: "درباره ما", href: "/About"},
    {name: "تماس با ما", href: "/Contact"},
    {name: "فروشگاه ما", href: "/Products"},
];

const icons = [
    {src: "/image/Group 9.svg", alt: "Notifications", size: 20},
    {src: <FaRegUser/>, alt: "Profile", size: 24},
    {icon: <IoBagOutline/>, alt: "Shopping Bag", size: 24},
];

const availableColors = [
    { name: "قرمز", hex_code: "#FF0000" },
    { name: "سبز", hex_code: "#00FF00" },
    { name: "آبی", hex_code: "#0000FF" },
    { name: "زرد", hex_code: "#FFFF00" },
    { name: "مشکی", hex_code: "#000000" },
    { name: "سفید", hex_code: "#FFFFFF" },
    { name: "نارنجی", hex_code: "#FFA500" },
    { name: "بنفش", hex_code: "#800080" },
    { name: "صورتی", hex_code: "#FFC0CB" },
    { name: "قهوه‌ای", hex_code: "#8B4513" },
    { name: "آبی آسمانی", hex_code: "#87CEEB" },
    { name: "فیروزه‌ای", hex_code: "#40E0D0" },
    { name: "لیمویی", hex_code: "#FFF700" },
    { name: "خاکستری", hex_code: "#808080" },
    { name: "آبی نفتی", hex_code: "#000080" },
    { name: "سبز زیتونی", hex_code: "#808000" },
    { name: "زرد طلایی", hex_code: "#FFD700" },
    { name: "آبی فیروزه‌ای", hex_code: "#00CED1" },
    { name: "ارغوانی", hex_code: "#C71585" },
    { name: "لاجوردی", hex_code: "#1E90FF" },
    { name: "زرشکی", hex_code: "#800000" },
    { name: "یشمی", hex_code: "#00A86B" },
    { name: "آبی کاربنی", hex_code: "#003366" },
    { name: "نیلی", hex_code: "#4B0082" },
    { name: "سبز چمنی", hex_code: "#7CFC00" },
    { name: "زیتونی روشن", hex_code: "#9ACD32" },
    { name: "کرم", hex_code: "#FFFDD0" },
    { name: "خاکی", hex_code: "#F0E68C" },
    { name: "برنزی", hex_code: "#CD7F32" },
    { name: "نقره‌ای", hex_code: "#C0C0C0" },
    { name: "طلایی", hex_code: "#FFD700" },
    { name: "آبی آکوامارین", hex_code: "#7FFFD4" },
    { name: "سبز دریایی", hex_code: "#2E8B57" },
    { name: "قرمز شرابی", hex_code: "#B22222" },
    { name: "خاکستری روشن", hex_code: "#D3D3D3" },
];

export { menuItems , icons , availableColors}