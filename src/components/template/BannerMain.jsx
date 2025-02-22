import React from 'react';
import Image from "next/image";
import Link from "next/link";

function BannerMain(props) {
    return (
        <Link href="" className="mt-24">

            <Image className="w-full hidden md:block h-auto object-cover mt-10" src="/Group 763.svg" alt="Slide 1" width={500} height={500} />
            <Image className="w-full block md:hidden h-auto object-cover mt-10" src="/Group 761.svg" alt="Slide 1" width={500} height={500} />

        </Link>
    );
}

export default BannerMain;