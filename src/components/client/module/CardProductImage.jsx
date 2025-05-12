import React from 'react';
import Link from "next/link";
import Image from "next/image";

function CardProductImage({product , id}) {
    console.log(product)
    return (
        <Link href={`/Products/${id}`}>
            <Image
                src={product.category.image }
                alt={product.name || "محصول بدون نام"}
                width={180}
                height={300}
            />
        </Link>
    );
}

export default CardProductImage;