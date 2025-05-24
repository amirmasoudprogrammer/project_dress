"use client";
import React, {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Toaster, toast} from 'sonner'
import Cookies from "js-cookie";

function CreateCategoriesPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [isActive, setIsActive] = useState("1");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postdata = new FormData();
        postdata.append("name", name);
        postdata.append("description", description);
        postdata.append("image", image);
        postdata.append("is_active", isActive);

        try {
            const token = Cookies.get("tokenAdmin")
            const res = await axios.post("https://joppin.ir/api/v1/admin/categories", postdata, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });

            if (res.status === 201) {
                toast.success(res.data.message);
                setTimeout(() => {
                    router.push("/Admin_Dashboard/Categories");
                }, 2000);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <>
            <Toaster expand={true} position="bottom-center" richColors/>
            <div className="mt-32 mr-8">
                <div>
                    <span className="text-[25px] font-bold">افزودن دسته بندی جدید</span>
                    <div>
                        <span className="text-[12px] text-slate-500">
                            اطلاعات دسته بندی را وارد کنید و دکمه ذخیره را بزنید
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-20 flex flex-col items-start">
                    <div className="flex items-center">
                        <div>
                            <div className="flex flex-col">
                                <label htmlFor="name">نام دسته بندی</label>
                                <input
                                    id="name"
                                    name="name"
                                    className="w-[500px] h-[35px] rounded mt-1 outline-0 border border-slate-300"
                                    type="text"
                                    placeholder="نام محصول وارد کنید"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mr-10">
                            <div className="flex flex-col">
                                <label htmlFor="category">دسته‌بندی ولد</label>
                                <select
                                    id="category"
                                    name="category"
                                    className="text-slate-600 w-[220px] md:w-[500px] mt-2 h-[37px] outline-0 border border-slate-400 rounded"
                                >
                                    <option value="">انتخاب دسته‌بندی</option>
                                    <option value="پوشاک">پوشاک</option>
                                    <option value="کفش">کفش</option>
                                    <option value="اکسسوری">اکسسوری</option>
                                </select>
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col items-start justify-start mt-10">
                        <label className="text-end text-lg font-normal mb-4">تصویر محصول</label>
                        <div className="flex flex-col gap-2">
                            <input
                                type="file"
                                className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>وضعیت</label>
                        <select
                            className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                            value={isActive}
                            onChange={(e) => setIsActive(e.target.value)}
                        >
                            <option value="1">ON</option>
                            <option value="0">OFF</option>
                        </select>
                    </div>

                    <div className="flex items-center mr-auto ml-28 mt-6">
                        <button
                            type="button"
                            className="text-[11px] ml-5 border-2 rounded border border-slate-400 border-dashed p-3"
                        >
                            انصراف
                        </button>
                        <button type="submit" className="text-[12px] p-3 bg-indigo-700 text-white rounded">
                            ذخیره محصول
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateCategoriesPage;
