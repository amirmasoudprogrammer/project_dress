"use client"
import React from 'react';
import FavoritesPage from "@/components/client/module/FavoritesPage";
import {useSelector} from "react-redux";

function Page(props) {
    const state = useSelector((state) => state.cart);
    const favoritesItem = state.favorites || []
    return (
        <>
            <FavoritesPage data={favoritesItem}/>
        </>
    );
}

export default Page;