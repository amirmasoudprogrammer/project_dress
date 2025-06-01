"use client";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import AddAbout from "@/components/admin/modules/AddAbout";
import EditAbout from "@/components/admin/modules/EditAbout";
import DeleteAbout from "@/components/admin/modules/DeleteAbout";


function AboutPage() {
    const [aboutData, setAboutData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editPopups, setEditPopups] = useState({show:false ,id:null});
    const [deletePopups, setDeletePopups] = useState({show:false ,id:null});

    const fetchData = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get('https://joppin.ir/api/v1/abouts', {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });
            const rawData = res.data.data;
            setAboutData(Array.isArray(rawData) ? rawData : rawData ? [rawData] : []);
        } catch (error) {
            console.error('خطا در گرفتن داده‌ها:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const deletAbout = (id) =>{
        setDeletePopups({show: true,id:id})
    }


    return (
        <div className="p-8 max-w-4xl mx-auto text-right font-estedad relative">
            <h1 className="text-2xl font-bold text-center mb-12 pb-4">
                🖼️ مدیریت درباره ما
            </h1>
            <div className="flex items-start mb-5 justify-start">
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
                >
                    ➕ اضافه کردن
                </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {aboutData?.map((item) => (
                    <div
                        key={item.id}
                        className="bg-gradient-to-br from-white to-gray-50 shadow-md border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                    >
                        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                            {item.description}
                        </p>
                        <div className="flex gap-4 mt-6 justify-start">


                            <button
                                onClick={() => {
                                }}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-lg shadow transition"
                            >
                                ✏️ ویرایش
                            </button>
                            <button
                                onClick={() => deletAbout(item.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow transition"
                            >
                                🗑️ حذف
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showAddModal && <AddAbout onClose={() => setShowAddModal(false)}/>}
            {editPopups.show && <EditAbout />}
            {deletePopups.show && <DeleteAbout  deletePopups={deletePopups} setDeletePopups={setDeletePopups}/>}
        </div>
    );
}

export default AboutPage;
