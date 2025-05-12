import React from 'react';
import axios from "axios";
import {toast, Toaster} from "sonner";

function DeleteProducts({setDeletePopup, deletePopup}) {

    const performDelete = async () => {
        try {
            const res = await axios.delete(`https://joppin.ir/api/v1/admin/products/${deletePopup.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: 'application/json'
                }
            });
            console.log(res)

            if (res.status === 200) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error("حذف با خطا مواجه شد");
            console.error(error);
        } finally {
            setDeletePopup({show: false, id: null});
        }
    };

    return (
        <>
            <Toaster expand={true} position="bottom-center" richColors/>
            {
                deletePopup.show && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">

                        <div className="bg-white p-6 rounded-lg shadow-md w-[300px] text-center">
                            <h2 className="text-lg font-bold mb-4">آیا از حذف مطمئن هستید؟</h2>
                            <div className="flex justify-around mt-6">
                                <button
                                    onClick={() => setDeletePopup({show: false, id: null})}
                                    className="px-4 py-2 bg-gray-300 rounded text-sm"
                                >
                                    انصراف
                                </button>
                                <button
                                    onClick={performDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded text-sm"
                                >
                                    حذف شود
                                </button>
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
}

export default DeleteProducts;