import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import axios from "axios";
import {toast} from "sonner";

function EditUser({editPopups,setEditPopups}) {
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',

    })

    useEffect(() => {
        if (editPopups.show && editPopups.item) {
            setFormData({
                user_name: editPopups.item.user_name || '',
                email: editPopups.item.email || '',
            });
        }
    }, [editPopups]);

    const handlerOnChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const startSubmit = async (e) =>{
        e.preventDefault()

        const form = new FormData()
        form.append("user_name",formData.user_name)
        form.append("email",formData.email)
        form.append("_method","PUT");

        const res = await axios.post(`https://joppin.ir/api/users/${editPopups.item.id}`,form , {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
        })
      if (res.status === 200){
          toast.success(res.data.message );
          setEditPopups({show:false , item:null})
      }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.3}}
                className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            >
                <motion.div
                    initial={{scale: 0.8}}
                    animate={{scale: 1}}
                    exit={{scale: 0.8}}
                    transition={{duration: 0.3}}
                    className="bg-white p-6 rounded-xl w-[400px] shadow-xl text-right"
                >
                    <h2 className="text-lg font-bold mb-4">افزودن کاربر جدید</h2>
                    <form className="space-y-4" onSubmit={startSubmit}>
                        <div className="flex flex-col">
                            <label className="mr-2 mb-2 text-[13px]">نام کاربری</label>
                            <input type="text" name="user_name" value={formData.user_name}
                                   onChange={handlerOnChange} placeholder="نام کاربری"
                                   className="w-full border px-3 py-2 rounded"/>
                        </div>

                        <div className="flex flex-col">
                            <label className="mr-2 mb-2 text-[13px]">ایمیل</label>
                            <input type="email"
                                   name="email"
                                   value={formData.email}
                                   onChange={handlerOnChange}
                                   placeholder="ایمیل"
                                   className="w-full border px-3 py-2 rounded"/>
                        </div>
                        <div className="w-full ml-auto flex items-end justify-end">
                            <button
                                type="button"
                                onClick={() => setEditPopups(false)}
                                className="bg-slate-200 w-[80px] rounded text-[13px] py-2 ml-2 mt-4 text-black text-sm hover:underline"
                            >
                                بستن
                            </button>
                            <button type="submit"
                                    className="w-[100px] text-[13px] bg-blue-600 text-white py-2 rounded">
                                افزودن کاربر
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default EditUser;