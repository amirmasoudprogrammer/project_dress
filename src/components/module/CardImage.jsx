import React from 'react';
import Image from "next/image";

function CardImage({ data }) {
    const { name, color } = data;
    console.log(data)
    return (
        <div className={`${color} w-full sm:w-[250px]  md:w-[324px]  h-[250px] md:h-[400px] flex items-end justify-center rounded-t-full overflow-hidden`}>
            <Image
                src={name}
                className={"object-cover flex items-center justify-center transition-all hover:scale-125"}
                alt="image"
                width={280}
                height={280}
            />
        </div>
    );
}

export default CardImage;
