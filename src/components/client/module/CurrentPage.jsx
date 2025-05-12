import React from 'react';
import Image from "next/image";

function CurrentPage(props) {
    return (
        <>
            <div className="flex items-center justify-center flex-col m-auto ">
                <Image src="/image/storage_4706386 1.svg"  width="100" height="100" alt=""/>
                <span className="text-black text-[14px] mt-2">هنوز هیچ سفارشی ندادید</span>
            </div>

        </>
    );
}

export default CurrentPage;