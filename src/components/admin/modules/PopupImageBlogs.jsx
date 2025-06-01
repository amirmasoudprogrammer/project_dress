import React, {useState} from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

function PopupImageBlogs({popupBlogs, setPopupBlogs}) {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("image", image);

        try {
            setLoading(true);
            const token = Cookies.get('tokenAdmin');
            const res = await axios.post(`https://joppin.ir/api/v1/blog/${popupBlogs.id}/upload-image`, formData, {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });

            console.log(res)
        } catch (error) {
            console.error("Error sending blog:", error);
            alert("ارسال با خطا مواجه شد ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl space-y-4">
                <h2 className="text-lg font-bold text-gray-800">افزودن بلاگ جدید</h2>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setPopupBlogs({show: false, id: null})}
                        className="bg-gray-200 text-black px-4 py-2 rounded"
                    >
                        بستن
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {loading ? "در حال ارسال..." : "ارسال"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PopupImageBlogs;
