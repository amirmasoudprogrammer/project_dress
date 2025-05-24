"use client"
import React, {useState} from 'react';
import {FiTrash2} from "react-icons/fi";
import axios from "axios";
import {toast, Toaster} from "sonner";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

function AddBlogs() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [subImages, setSubImages] = useState([]);


    const handleAddSubImage = () => {
        if (subImages.length >= 20) return;
        setSubImages([...subImages, {image: null, preview: '', description: '', sortOrder: 0}]);
    };

    const handleSubImageChange = (index, field, value) => {
        const updated = [...subImages];
        if (field === "image") {
            updated[index].image = value;
            updated[index].preview = URL.createObjectURL(value);
        } else {
            updated[index][field] = value;
        }
        setSubImages(updated);
    };

    const handleRemoveSubImage = (index) => {
        const updated = [...subImages];
        updated.splice(index, 1);
        setSubImages(updated);
    };

    const handleSubmit = async () => {
        const form = new FormData();
        form.append("title", title);
        form.append("content", content);
        subImages.forEach((img, index) => {
            if (img.image) form.append(`images[${index}][file]`, img.image);
            form.append(`images[${index}][description]`, img.description || "");
            form.append(`images[${index}][sort_order]`, img.sortOrder || 0);
        });

        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.post(`https://joppin.ir/api/v1/blog`, form, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });

            if (res.status === 200) {
                toast.success("پست با موفقیت ثبت شد.");
                setTimeout(() => {
                    router.push("/Admin_Dashboard/Blogs");
                }, 1000);
            }
        } catch (error) {
            console.error(error);
            toast.error("خطا در ارسال پست.");
        }

    };

    return (
        <div className="p-6 mt-28 max-w-5xl mx-auto space-y-8">
            <Toaster expand={true} position="bottom-center" richColors/>
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">افزودن پست وبلاگ</h2>
            <input type="text" placeholder="عنوان پست" value={title} onChange={(e) => setTitle(e.target.value)}
                   className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
            <textarea placeholder="محتوای پست" value={content} onChange={(e) => setContent(e.target.value)}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 h-40 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
            <div>
                <label htmlFor="images" className="text-lg font-semibold text-gray-700">تصویر اصلی</label>
                <input type="file"  placeholder="تصویر اصلی" onChange={(e) => setImages(e.target.files[0])}/>
            </div>


            <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-700">تصاویر دیگر</h3>
                    <button
                        type="button"
                        onClick={handleAddSubImage}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        + افزودن تصویر
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subImages.map((img, index) => (
                        <div key={index} className="border rounded-2xl p-4 shadow-md space-y-3 relative bg-white">
                            <button
                                onClick={() => handleRemoveSubImage(index)}
                                className="absolute top-3 left-3 text-red-500 hover:text-red-700"
                                title="حذف تصویر"
                            >
                                <FiTrash2 size={20}/>
                            </button>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleSubImageChange(index, "image", e.target.files[0])
                                }
                                className="w-full border rounded-xl p-2"
                            />

                            {img.preview && (
                                <img
                                    src={img.preview}
                                    alt={`preview-${index}`}
                                    className="w-full h-40 object-cover rounded-xl"
                                />
                            )}

                            <input
                                type="text"
                                placeholder="توضیح تصویر"
                                value={img.description}
                                onChange={(e) =>
                                    handleSubImageChange(index, "description", e.target.value)
                                }
                                className="w-full border rounded-xl px-3 py-2"
                            />

                            <input
                                type="number"
                                placeholder="ترتیب نمایش تا 20"
                                value={img.sortOrder}
                                min={0}
                                max={20}
                                onChange={(e) =>
                                    handleSubImageChange(index, "sortOrder", parseInt(e.target.value))
                                }
                                className="w-full border rounded-xl px-3 py-2"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={handleSubmit}
                type="button"
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
            >
                ثبت پست
            </button>
        </div>
    );
}

export default AddBlogs;
