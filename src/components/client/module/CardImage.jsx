import React from 'react';
import Image from "next/image";

function CardImage({data}) {
    const { image, color } = data;





    return (
        <div
            className={`${color.color} w-full sm:w-[250px]  md:w-[324px] h-[250px] md:h-[400px] flex items-end justify-center rounded-t-full overflow-hidden`}>
            <Image
                src={image}
                className={"object-cover flex items-center justify-center transition-all hover:scale-125"}
                alt="image"
                width={280}
                height={280}
            />
        </div>
    );
}

export default CardImage;
