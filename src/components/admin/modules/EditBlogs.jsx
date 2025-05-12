import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { FiTrash2 } from "react-icons/fi";

function EditBlogs({ editBlogs, setEditeBlogs }) {
    const [title, setTitle] = useState(editBlogs.item.title ?? '');
    const [content, setContent] = useState(editBlogs.item.content ?? '');
    const [subImages, setSubImages] = useState(
        (editBlogs.item.images ?? []).map(img => ({
            image_path: img.image_path ?? '',
            file: '',
            description: img.description ?? '',
            sort_order: img.sort_order ?? 0
        }))
    );
    console.log(editBlogs.item.images)

    const handleAddSubImage = () => {
        if (subImages.length >= 20) return;
        setSubImages([
            ...subImages,
            { file: '', image_path: '', description: "", sort_order: 0 }
        ]);
    };

    const handleSubImageChange = (index, field, value) => {
        const updated = [...subImages];
        updated[index][field] = value;
        setSubImages(updated);
    };

    const handleRemoveSubImage = (index) => {
        const updated = [...subImages];
        updated.splice(index, 1);
        setSubImages(updated);
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("_method","PUT");

            subImages.forEach((img, index) => {
                if (img.file) {
                    formData.append(`images[${index}][images]`, img.file);
                }
                formData.append(`images[${index}][description]`, img.description);
                formData.append(`images[${index}][sort_order]`, img.sort_order);
            });

            await axios.post(`https://joppin.ir/api/v1/blog/${editBlogs.item.id}`, formData);
            toast.success("پست با موفقیت ویرایش شد");
            setEditeBlogs({ show: false, item: null });
        } catch (error) {
            toast.error("خطا در ویرایش پست");
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] md:w-[500px] shadow-lg space-y-4 overflow-y-auto max-h-[80vh]">
                <h2 className="text-lg font-bold">ویرایش پست</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="عنوان"
                    className="w-full border rounded-xl px-4 py-2"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="محتوا"
                    rows={4}
                    className="w-full border rounded-xl px-4 py-2"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                    >
                        ذخیره
                    </button>
                    <button
                        onClick={() => setEditeBlogs({ show: false, item: null })}
                        className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400"
                    >
                        لغو
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">تصاویر فرعی</h3>
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
                                    <FiTrash2 size={20} />
                                </button>

                                {img.image_path && !img.file && (
                                    <img
                                        src={`https://joppin.ir${img.image_path}`}
                                        alt="پیش‌نمایش"
                                        className="w-full h-20 object-cover rounded-xl"
                                    />
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleSubImageChange(index, "file", e.target.files[0])
                                    }
                                    className="w-full border rounded-xl p-2"
                                />

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
                                    placeholder="ترتیب نمایش (1 تا 20)"
                                    value={img.sort_order ?? 0}
                                    min={0}
                                    max={20}
                                    onChange={(e) =>
                                        handleSubImageChange(index, "sort_order", parseInt(e.target.value) || 0)
                                    }
                                    className="w-full border rounded-xl px-3 py-2"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditBlogs;
