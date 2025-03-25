import React from 'react';
import Link from "next/link";
import Image from "next/image";

function CardProductImage({product , id}) {
    return (
        <Link href={`/Products/${id}`}>
            <Image
                src={product.image || "/images1235.png"}
                alt={product.name || "محصول بدون نام"}
                width={180}
                height={300}
            />
        </Link>
    );
}

export default CardProductImage;