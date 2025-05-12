import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "sonner";
import Cookies from "js-cookie";

function EditProducts({popupEdit, setPopupEdit}) {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        sku: "",
        category: "",
        description: "",
        isActive: false,
        image: null,
        galleryImages: []
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('tokenAdmin');
                const res = await axios.get('https://joppin.ir/api/v1/admin/categories',{
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                const result = res.data?.data
                const activeItems = result?.filter((item) => item.is_active);
                setCategories(activeItems);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        const interval = setInterval(() => {
            fetchData()
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        if (popupEdit.show && popupEdit.item) {
            setFormData({
                name: popupEdit.item.name || "",
                price: popupEdit.item.price || "",
                sku: popupEdit.item.sku || "",
                category: popupEdit.item.category?.id || "",
                discountPrice: popupEdit.item.discountPrice || "",
                description: popupEdit.item.description || "",
                isActive: popupEdit.item.status || false,
                image: null,
                galleryImages: []
            });
        }
    }, [popupEdit])

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name === "isActive") {
            setFormData({...formData, [name]: value === "1"});
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({...formData, image: file});
    };

    const handleGalleryImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({...formData, galleryImages: files});
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault()

        const form = new FormData();

        form.append("name", formData.name);
        form.append("price", formData.price);
        form.append("sku", formData.sku);
        form.append("category_id", formData.category);
        form.append("description", formData.description);
        form.append("isActive", formData.isActive ? "1" : "0");
        form.append("_method","PUT");

        if (formData.image) {
            form.append("featured_image", formData.image);
        }

        formData.galleryImages.forEach((file, index) => {
            form.append("galleryImages[]", file);
        });


        try {
            const res = await axios.post(`https://joppin.ir/api/v1/admin/products/${popupEdit.item.id}`,form,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            })
            if (res.status === 200){
                toast.success(res.data.message);
                setPopupEdit({show: false, item: null});
            }

        } catch (err) {
console.log(err)
        }

    }

    return (
        <>
            {popupEdit.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                    <div
                        className="bg-white p-6 rounded-lg shadow-md w-[430px] max-w-[95%] overflow-y-auto max-h-[90vh]">
                        <h2 className="text-lg font-bold mb-4">ویرایش محصول</h2>
                        <form onSubmit={handleEditSubmit} className="flex flex-col items-start">
                            <div className="flex flex-wrap gap-5 items-center ">
                                <div className="flex justify-between w-[350px] items-center justify-center">
                                    <div className="flex flex-col ml-2 w-[180px] ">
                                        <label htmlFor="name">نام محصول</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="نام محصول وارد کنید"
                                            className="h-[35px] rounded mt-1 outline-0 border border-slate-300"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col mr-2 w-[180px] ">
                                        <label htmlFor="price">قیمت (تومان)</label>
                                        <input
                                            id="price"
                                            name="price"
                                            type="number"
                                            placeholder="قیمت محصول را وارد کنید"
                                            className="h-[35px] rounded mt-1 outline-0 border border-slate-300"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col w-[380px]  mt-5">
                                    <label htmlFor="category">دسته‌بندی</label>
                                    <select
                                        id="category"
                                        name="category"
                                        className="h-[37px] outline-0 border border-slate-400 rounded"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">انتخاب دسته‌بندی</option>
                                        {categories?.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col w-[380px]  mt-5">
                                    <label htmlFor="sku">کد محصول</label>
                                    <input
                                        id="sku"
                                        name="sku"
                                        type="number"
                                        placeholder="کد محصول را وارد کنید"
                                        className="h-[35px] rounded mt-1 outline-0 border border-slate-300"
                                        value={formData.sku}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col w-[380px]  mt-5">
                                    <label htmlFor="description">توضیحات محصول</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="توضیحات محصول را وارد کنید"
                                        className="pr-3 pt-2 mt-2 h-[150px] outline-0 border border-slate-400 rounded resize-none"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col w-[380px]  mt-5">
                                    <label htmlFor="image">تصویر اصلی محصول</label>
                                    <input
                                        name="image"
                                        type="file"
                                        className="border border-gray-300 p-2 rounded mt-2"
                                        onChange={handleMainImageChange}
                                    />
                                </div>
                                <div className="flex flex-col w-[380px]  mt-5">
                                    <label htmlFor="galleryImages">تصویرهای فرعی</label>
                                    <input
                                        name="galleryImages"
                                        type="file"
                                        multiple
                                        className="border border-gray-300 p-2 rounded mt-2"
                                        onChange={handleGalleryImagesChange}
                                    />
                                </div>
                                <div className="flex flex-col w-[380px]  mt-5">
                                    <label>وضعیت</label>
                                    <select
                                        name="isActive"
                                        className="p-2 rounded-md outline-none border-2 border-zinc-300 focus:border-orange-400"
                                        value={formData.isActive ? "1" : "0"}
                                        onChange={handleInputChange}
                                    >
                                        <option value="1">ON</option>
                                        <option value="0">OFF</option>
                                    </select>
                                    <span className="text-slate-500 text-[11px] mt-2">
                                        اگر این گزینه را انتخاب کنید محصول در سایت موجود است، در غیر این صورت موجود نیست.
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between mt-5 w-[350px]">
                                <button
                                    onClick={() => setPopupEdit({show: false, item: null})}
                                    className="px-4 py-2 bg-gray-400 text-white rounded text-sm"
                                >
                                    انصراف
                                </button>
                                <button

                                    className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                                >
                                    ذخیره تغییرات
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditProducts;
