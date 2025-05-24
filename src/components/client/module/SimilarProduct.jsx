import React from 'react';
import CardProduct from "@/components/client/module/CardProduct";
import {useGetProductsQuery} from "@/redux/features/api/apiSlice";

function SimilarProduct(props) {
    const { data: products, isLoading, error } = useGetProductsQuery();

    if (isLoading) return <div>در حال بارگذاری...</div>;
    if (error) return <div>خطا در بارگذاری محصولات مشابه</div>;
    return (
        <div className="mt-36">
            <div className="w-full max-w-sm text-black mb-6">
                <h2 className="text-2xl font-bold mb-2 relative inline-block">
                    محصولات مشابه
                    <span className="block w-24 h-1 bg-black mt-1 rounded-full"></span>
                </h2>
            </div>

            <div className="w-full mt-10 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products && Array.isArray(products.data) && products.data.slice(0, 4).map((item) => (
                        <div className="w-[250px] m-auto" key={item.id}>
                            <CardProduct data={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SimilarProduct;