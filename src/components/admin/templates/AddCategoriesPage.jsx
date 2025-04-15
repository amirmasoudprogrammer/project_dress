"use client"
import React ,{useState , useRef} from 'react';
import {BiImageAdd} from "react-icons/bi";

function AddCategoriesPage(props) {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        isActive: false
    });

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const validTypes = ["image/jpeg", "image/png", "image/gif"];
            const maxSize = 10 * 1024 * 1024; // 10MB

            if (!validTypes.includes(file.type)) {
                alert("فرمت فایل مجاز نیست. فقط gif, jpg, png مجازند.");
                return;
            }

            if (file.size > maxSize) {
                alert("حجم فایل بیش از ۱۰ مگابایت است.");
                return;
            }

            setFileName(file.name);
        }
    };
    return (
        <div className="mt-32 mr-8">
            <div>
                <span className="text-[25px] font-bold">افزودن دسته بندی جدید</span>
                <div>
                    <span className="text-[12px] text-slate-500">
                        اطلاعات دسته بندی را وارد کنید و دکمه ذخیره را بزنید
                    </span>
                </div>
            </div>

            <form action="" className="mt-20 flex flex-col items-start">
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
                                value={formData.name}
                                onChange={handleInputChange}
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
                                value={formData.category}
                                onChange={handleInputChange}
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
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="flex flex-col items-start justify-start mt-10">
                    <label className="text-end text-lg font-normal mb-4">تصویر محصول</label>

                    <div
                        onClick={handleDivClick}
                        className="w-[1050px] h-[150px] border-dashed border-2 border-slate-400 rounded flex flex-col items-center justify-center cursor-pointer hover:border-slate-400 transition"
                    >
                        {fileName ? (
                            <p className="text-green-600 font-medium">فایل انتخاب شده: {fileName}</p>
                        ) : (
                            <>
                                <div className="text-[30px] text-gray-600">
                                    <BiImageAdd />
                                </div>
                                <p className="text-gray-600 text-base">آپلود فایل با کشیدن و رها کردن</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    فرمت‌های مجاز: gif, jpg, png - حداکثر 10 مگابایت
                                </p>
                            </>
                        )}
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.gif"
                    />
                </div>

                <div className="mt-5">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleInputChange}
                        />
                        <label className="text-[12px] mr-3">محصول فعال باشد</label>
                    </div>
                    <span className="text-slate-500 text-[11px] mr-5">
                        اگر این گزینه را انتخاب کنید محصول در سایت نمایش داده می‌شود
                    </span>
                </div>

                <div className="flex items-center mr-auto ml-28 mt-6">
                    <button type="button" className="text-[11px] ml-5 border-2 rounded border border-slate-400 border-dashed p-3">
                        انصراف
                    </button>
                    <button type="submit" className="text-[12px] p-3 bg-indigo-700 text-white rounded">
                        ذخیره محصول
                    </button>
                </div>
            </form>
        </div>

    );
}

export default AddCategoriesPage;