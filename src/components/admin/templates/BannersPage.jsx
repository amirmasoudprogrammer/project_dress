"use client";
import React, {useState} from "react";
import {FaPlus} from "react-icons/fa6";
import {IoIosSearch} from "react-icons/io";
import NamePages from "@/components/admin/modules/NamePages";
import {Toaster} from 'sonner'
import DeleteBanner from "@/components/admin/modules/DeleteBanner";
import CreateBanner from "@/components/admin/modules/CreateBanner";
import DataTable from "@/components/admin/modules/DataTable";



function BannersPage({data}) {
    const [showModal, setShowModal] = useState(false);
    const [popupDelete, setPopupDelete] = useState({show: false, id: null})
    const [loading, setLoading] = useState(false);

    const confirmDelete = (id) => {
        setPopupDelete({show: true, id})
    }





    return (
        <div className="mt-20 z-10">
            <Toaster expand={true} position="bottom-center" richColors/>

            <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
                🖼️ مدیریت بنرها
            </h1>


            <div className="flex items-center justify-start mr-8 mt-10">
                <div
                    className="flex items-center justify-center bg-indigo-700 p-2 text-[12px] text-white rounded cursor-pointer"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus/>
                    <span className="mr-2 text-white">افزودن بنر جدید</span>
                </div>

                <form className="mr-3 flex -mt-1">
                    <div
                        className="mt-2 flex rounded border border-slate-300 h-[30px] items-center justify-around px-2">
                        <IoIosSearch/>
                        <input
                            type="text"
                            className="outline-0 border-0 ml-2 text-sm"
                            placeholder="جستجو بنر "
                        />
                    </div>
                </form>
            </div>

           <DataTable  confirmDelete={confirmDelete} data={data} loading={loading} setLoading={setLoading}/>

            <CreateBanner showModal={showModal} setShowModal={setShowModal} setLoading={setLoading} loading={loading}/>

            <div className="mt-5">
                <span className="mr-8 text-[14px] font-normal">نمایش 1 تا 5 از 12 نتیجه</span>
            </div>

            <DeleteBanner popupDelete={popupDelete} setPopupDelete={setPopupDelete}/>
        </div>
    );
}

export default BannersPage;
