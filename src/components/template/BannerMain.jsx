import React from 'react';
import Image from "next/image";
import Link from "next/link";

function BannerMain(props) {
    return (
        <Link href="" className="mt-24">

            <Image className="w-full h-auto object-cover mt-10" src="/Group 763.svg" alt="Slide 1" width={500} height={500} />

        </Link>
    );
}

export default BannerMain;