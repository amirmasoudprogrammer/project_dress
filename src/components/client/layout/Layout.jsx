import React from 'react';
import Header from "@/components/client/layout/Header";
import Footer from "@/components/client/layout/Footer";

function Layout({children}) {
    return (
        <>
            <Header/>
            <div>{children}</div>
            <Footer/>
        </>
    );
}

export default Layout;