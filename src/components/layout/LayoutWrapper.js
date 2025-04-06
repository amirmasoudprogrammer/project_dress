"use client";
import { usePathname } from "next/navigation";
import Layout from "@/components/layout/Layout";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const noLayoutPages = ["/Login&Registration", "/User_Dashboard" , "/User_Dashboard/orders" ,"/User_Dashboard/ticket/new" , "/User_Dashboard/ticket/ticketAll" ,  "/User_Dashboard/favorites", "/User_Dashboard/orders/current","/User_Dashboard/orders/delivered","/User_Dashboard/orders/returned" ,"/User_Dashboard/orders/canceled" , "/Shopping_Cart"]; // 👈 صفحه‌هایی که هدر و فوتر نیاز ندارن و نمی‌خوان

    return noLayoutPages.includes(pathname) ? children : <Layout>{children}</Layout>;
}
