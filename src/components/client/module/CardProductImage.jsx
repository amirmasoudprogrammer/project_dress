import React from 'react';
import Link from "next/link";
import Image from "next/image";

function CardProductImage({ product, id }) {
    return (
        <Link
            href={`/Products/${id}/${product.slug}`}
            className="block w-full h-[200px] relative overflow-hidden rounded"
        >
            <Image
                src={product.featured_image}
                alt={product.name || "محصول بدون نام"}
                fill
                className="object-cover"
                priority
            />
        </Link>
    );
}

export default CardProductImage;
