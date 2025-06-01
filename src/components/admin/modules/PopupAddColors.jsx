import React, {useState} from 'react';
import {motion} from "framer-motion";
import axios from "axios";
import Cookies from "js-cookie";
import {IoMdClose} from "react-icons/io";
import {toast} from "sonner";

function PopupAddColors({setAddColors}) {
    const [formData, setFormData] = useState({
        name: '',
        display_name: '',
        hex_code: '#000000'
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {

        const form =new FormData()
        form.append("name" , formData.name)
        form.append("display_name" , formData.display_name)
        form.append("hex_code" , formData.hex_code)
        e.preventDefault();
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.post('https://joppin.ir/api/v1/admin/colors', form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.data){
                toast.success(res.data.message)
                setAddColors(false)
            }
            console.log(res)



        } catch (error) {
            console.error("خطا در افزودن رنگ:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
            <motion.div
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 0.3}}
                className="bg-white p-8 rounded-2xl shadow-lg w-[90%] max-w-md relative"
            >
                <button onClick={() => setAddColors(false)} className="absolute top-3 left-3 text-gray-500 hover:text-red-500 text-xl">
                    <IoMdClose/>
                </button>
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">افزودن رنگ جدید</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">نام رنگ</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">نام نمایشی</label>
                        <input
                            type="text"
                            name="display_name"
                            value={formData.display_name}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">کد رنگ</label>
                        <input
                            type="color"
                            name="hex_code"
                            value={formData.hex_code}
                            onChange={handleChange}
                            className="w-full mt-1 h-10 cursor-pointer"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                    >
                        افزودن رنگ
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

export default PopupAddColors;
