import React from 'react';
import Image from "next/image";

function Banner(props) {
    return (
        <div>
            <Image
                className="w-screen  absolute top-0 bottom-0 "
                src="/Rectangle 4.svg"
                alt="Sample Image"
                width={800}
                height={800}
            />
        </div>
    );
}

export default Banner;