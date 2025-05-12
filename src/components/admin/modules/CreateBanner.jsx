import React, {useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {IoClose} from "react-icons/io5";
import axios from "axios";
import {toast} from "sonner";

function CreateBanner({showModal, setLoading, setShowModal, loading}) {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("0");
    const [status, setStatus] = useState("1");
    const [image, setImage] = useState(null);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("alt", name);
            formDataToSend.append("position", position);
            formDataToSend.append("status", status);
            formDataToSend.append("image", image);

            const res = await axios.post(`https://joppin.ir/api/banners`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(res)

            if (res.data.status === "success") {
                toast.success("بنر اضافه شد ");
                setShowModal(false);

            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative"
                            initial={{y: -50, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: -50, opacity: 0}}
                        >
                            <button
                                className="absolute left-3 top-3 text-gray-500 hover:text-black"
                                onClick={() => setShowModal(false)}
                            >
                                <IoClose size={24}/>
                            </button>

                            <h2 className="text-lg font-bold mb-4 text-center">افزودن بنر جدید</h2>

                            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-sm">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="نام بنر"
                                    className="border border-gray-300 p-2 rounded"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    name="image"
                                    type="file"
                                    className="border border-gray-300 p-2 rounded"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                <div className="flex flex-col">
                                    <label>پوزیشن</label>
                                    <select
                                        name="position"
                                        className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                    >
                                        <option value="">انتخاب کنید</option>
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label>وضعیت</label>
                                    <select
                                        name="status"
                                        className="p-2 rounded-md w-full outline-none border-2 border-zinc-300 focus:border-orange-400"
                                        value={status}
                                        onChange={(e) => setStatus(Number(e.target.value))}
                                    >
                                        <option value="1">ON</option>
                                        <option value="0">OFF</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                                >
                                    {loading ? "در حال ذخیره..." : "ذخیره بنر"}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default CreateBanner;