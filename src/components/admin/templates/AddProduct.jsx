"use client";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast, Toaster} from "sonner";
import {useRouter} from "next/navigation";
import AddColors from "@/components/admin/modules/AddColors";
import Cookies from "js-cookie";

function AddProduct(props) {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        sku: "",
        category: "",
        description: "",
        isActive: false,
        image: null,
    });
    const [galleryImages, setGalleryImages] = useState([]);
    const [colors, setColors] = useState([
        {
            name: "",
            hex_code: "",
            stock: "",
            combinations: [{name: "", hex_code: "", description: ""}],
        },
    ]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = Cookies.get("tokenAdmin")
                const res = await axios.get("https://joppin.ir/api/v1/admin/categories", {
                    headers: token ? {Authorization: `Bearer ${token}`} : {}
                });
                const activeItems = res.data?.data?.filter((item) => item.is_active);
                setData(activeItems);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            image: file,
        }));
    };

    const handleGalleryImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setGalleryImages(files);
    };

    const startAdd = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("name", formData.name);
        form.append("price", formData.price);
        form.append("sku", formData.sku);
        form.append("category_id", formData.category);
        form.append("description", formData.description);
        form.append("isActive", formData.isActive ? 1 : 0);

        if (formData.image) {
            form.append("featured_image", formData.image);
        }

        galleryImages.forEach((img) => {
            form.append("gallery[]", img);
        });

        colors.forEach((color, index) => {
            form.append(`colors[${index}][name]`, color.name);
            form.append(`colors[${index}][hex_code]`, color.hex_code);
            form.append(`colors[${index}][stock]`, color.stock);
            color.combinations.forEach((comb, combIndex) => {
                form.append(`colors[${index}][combinations][${combIndex}][name]`, comb.name);
                form.append(`colors[${index}][combinations][${combIndex}][hex_code]`, comb.hex_code);
                form.append(`colors[${index}][combinations][${combIndex}][description]`, comb.description);
            });
        });

        try {
            const token = Cookies.get("tokenAdmin")
            const res = await axios.post("https://joppin.ir/api/v1/admin/products", form, {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });
            console.log(res)
            if (res.status === 201) {
                toast.success(res.data.message);
                setTimeout(() => {
                    router.push("/Admin_Dashboard/Product");
                }, 2000);
            }
        } catch (error) {
            console.error(error);
            const serverMessage = error.response?.data?.message || "خطایی رخ داده است.";
            toast.error(serverMessage);
        }
    };

    console.log(colors)


    return (
        <div className="mt-32 mr-8">
            <Toaster expand={true} position="bottom-center" richColors/>
            <div>
                <span className="text-[25px] font-bold">افزودن محصول جدید</span>
                <div>
                    <span className="text-[12px] text-slate-500">
                        اطلاعات محصول جدید را وارد کنید و دکمه ذخیره را بزنید
                    </span>
                </div>
            </div>

            <form action="" onSubmit={startAdd} className="mt-20 flex flex-col items-start">
                <div className="flex items-center">
                    <div>
                        <div className="flex flex-col">
                            <label htmlFor="name">نام محصول</label>
                            <input
                                id="name"
                                name="name"
                                className="w-[500px] h-[35px] rounded mt-1 outline-0 border border-slate-300"
                                type="text"
                                placeholder="نام محصول وارد کنید"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col mt-9">
                            <label htmlFor="price">قیمت (تومان)</label>
                            <input

                                id="price"
                                name="price"
                                className="w-[500px] h-[35px] rounded mt-1 outline-0 border border-slate-300"
                                type="number"
                                placeholder="قیمت محصول را وارد کنید"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="mr-10">
                        <div className="flex flex-col">
                            <label htmlFor="category">دسته‌بندی</label>
                            <select
                                id="category"
                                name="category"
                                className="text-slate-600 w-[220px] md:w-[500px] mt-2 h-[37px] outline-0 border border-slate-400 rounded"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                <option value="">انتخاب دسته‌بندی</option>
                                {data?.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>


                        </div>
                        <div className="flex flex-col mt-9">
                            <label htmlFor="sku">کد محصول</label>
                            <input
                                id="sku"
                                name="sku"
                                className="w-[500px] h-[35px] rounded mt-1 outline-0 border border-slate-300"
                                type="number"
                                placeholder="قیمت تخفیف‌خورده را وارد کنید"
                                value={formData.sku}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-10">
                    <label htmlFor="description">توضیحات محصول</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="توضیحات محصول را وارد کنید"
                        className="w-[1050px] pr-3 pt-2 mt-2 h-[150px] outline-0 border border-slate-400 rounded resize-none"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex item-center  ">
                    <div className="flex flex-col mt-10">
                        <label htmlFor="image">تصویر اصلی محصول</label>
                        <input
                            name="image"
                            type="file"
                            className="border border-gray-300 p-2 rounded mt-5"
                            onChange={handleMainImageChange}
                        />

                    </div>
                    <div className="flex flex-col mt-10 mr-10">
                        <label htmlFor="image">تصویر های فرعی</label>
                        <input
                            name="image"
                            type="file"
                            multiple
                            className="border border-gray-300 p-2 rounded mt-5"
                            onChange={handleGalleryImagesChange}
                        />

                    </div>

                </div>

                <div className="mt-5">
                    <div className="flex items-start flex-col mb-2">
                        <label className="mb-2">وضعیت</label>
                        <select
                            name="isActive"
                            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                            value={formData.isActive ? "1" : "0"}
                            onChange={handleInputChange}
                        >
                            <option value="1">ON</option>
                            <option value="0">OFF</option>
                        </select>
                    </div>
                    <span className="text-slate-500 text-[11px] ">
                        اگر این گزینه را انتخاب کنید محصول در سایت موجود هست اگر انتخاب نکنید موجود نیست
                    </span>
                </div>
                <div className="flex items-center mr-auto ml-28 mt-6">
                    <button type="button"
                            className="text-[11px] ml-5 border-2 rounded border border-slate-400 border-dashed p-3">
                        انصراف
                    </button>
                    <button type="submit" className="text-[12px] p-3 bg-indigo-700 text-white rounded">
                        ذخیره محصول
                    </button>
                </div>
            </form>
            <div>
                <AddColors colors={colors} setColors={setColors}/>
            </div>

        </div>
    );
}

export default AddProduct;
