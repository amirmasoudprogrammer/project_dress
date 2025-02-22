import React from 'react';
import Image from "next/image";
import Link from "next/link";

function CardUser({ data }) {
    const { image, name } = data;

    return (
        <Link href="">
            <div className="flex flex-col items-center justify-between">
                <div className="mt-2 relative w-[100px] h-[100px]">

                    <div className="absolute inset-0 border-[3px] ring-2 ring-rose-500 rounded-full  ring-offset-2 animate-spin-slow"></div>


                    <Image
                        className="rounded-full"
                        src={image}
                        alt={name}
                        width={100}
                        height={100}
                    />
                </div>
                <span className="mt-2">{name}</span>
            </div>
        </Link>
    );
}

export default CardUser;
