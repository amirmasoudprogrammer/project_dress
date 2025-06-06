"use client";
import { usePathname } from "next/navigation";
import Layout from "@/components/client/layout/Layout";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();

    const noLayoutPages = [
        "/Login_Registration", "/User_Dashboard",
        "/User_Dashboard/orders", "/User_Dashboard/ticket/new",
        "/User_Dashboard/ticket/ticketAll", "/User_Dashboard/favorites",
        "/User_Dashboard/orders/current", "/User_Dashboard/orders/delivered",
        "/User_Dashboard/orders/returned", "/User_Dashboard/orders/canceled",
        "/Shopping_Cart", "/Admin_Dashboard", "/Admin_Dashboard/Dashboard/DashboardOne",
        "/Admin_Dashboard/Dashboard/DashboardTwo", "/Admin_Dashboard/Product",
        "/Admin_Dashboard/CategoriesPage", "/Admin_Dashboard/Orders",
        "/Admin_Dashboard/Users", "/Admin_Dashboard/Warehouse",
        "/Admin_Dashboard/DiscountsPage", "/Admin_Dashboard/Blogs",
        "/Admin_Dashboard/Pages", "/Admin_Dashboard/Comments",
        "/Admin_Dashboard/Products_Comments", "/Admin_Dashboard/Banners",
        "/Admin_Dashboard/ticket", "/Admin_Dashboard/Menus",
        "/Admin_Dashboard/Settings", "/Admin_Dashboard/Product/add",
        "/Admin_Dashboard/Product/Colors",
        "/Admin_Dashboard/Categories", "/Admin_Dashboard/Categories/add",
        "/Admin_Dashboard/Users/roles", "/Admin_Dashboard/Users/permissions",
        "/Admin_Dashboard/Discounts", "/Admin_Dashboard/Discounts/Add",
        "/Admin_Dashboard/Discounts/Edit", "/Admin_Dashboard/Blogs/add",
        "/Admin_Dashboard/About",
        "/LoginAdmin"
    ];

    // بررسی مسیر داینامیک پروفایل
    const noLayout = noLayoutPages.includes(pathname) || pathname.startsWith("/User_Dashboard/profile/");

    return noLayout ? children : <Layout>{children}</Layout>;
}
