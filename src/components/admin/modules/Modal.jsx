import React from 'react';
import axios from "axios";
import {toast} from "sonner";

function Modal({closeModal, setNewProduct, newProduct ,setShowModal}) {

    const handleAddProduct = async () => {
        try {
            const form = new FormData();
            form.append("name", newProduct.name);
            form.append("sku", newProduct.sku);
            form.append("minimum_quantity", newProduct.minimumQuantity);
            form.append("cost_price", newProduct.costPrice);
            form.append("selling_price", newProduct.sellingPrice);
            form.append("description", newProduct.description);

            const res = await axios.post(`https://joppin.ir/api/inventory`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log( newProduct);
            if (res) {
                toast.success("در انبار ذخیره شد ... ");
                setNewProduct({
                    name: '',
                    sku: '',
                    minimumQuantity: 0,
                    costPrice: 0,
                    sellingPrice: 0,
                    description: ''
                });
                setShowModal(false)

            }
        } catch (e) {
            console.error("خطا در ثبت محصول:", e);
            toast.error("خطایی رخ داد. لطفا دوباره تلاش کنید.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-[400px] text-center relative">
                <button onClick={closeModal}
                        className="absolute left-2 top-2 text-gray-600 hover:text-gray-900 text-2xl">×
                </button>
                <h2 className="text-xl font-bold mb-4">افزودن محصول جدید</h2>
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="نام محصول"
                        value={newProduct.name || ''}
                        onChange={(e) => setNewProduct(prev => ({...prev, name: e.target.value}))}
                        className="border p-2 rounded outline-none"
                    />
                    <input
                        type="text"
                        placeholder="کد محصول (SKU)"
                        value={newProduct.sku || ''}
                        onChange={(e) => setNewProduct(prev => ({...prev, sku: e.target.value}))}
                        className="border p-2 rounded outline-none"
                    />
                    <input
                        type="number"
                        placeholder="حداقل موجودی"
                        value={newProduct.minimumQuantity ?? 0}
                        onChange={(e) => setNewProduct(prev => ({...prev, minimumQuantity: Number(e.target.value)}))}
                        className="border p-2 rounded outline-none"
                    />
                    <input
                        type="number"
                        placeholder="قیمت خرید (Cost Price)"
                        value={newProduct.costPrice ?? 0}
                        onChange={(e) => setNewProduct(prev => ({...prev, costPrice: Number(e.target.value)}))}
                        className="border p-2 rounded outline-none"
                    />
                    <input
                        type="number"
                        placeholder="قیمت فروش (Selling Price)"
                        value={newProduct.sellingPrice ?? 0}
                        onChange={(e) => setNewProduct(prev => ({...prev, sellingPrice: Number(e.target.value)}))}
                        className="border p-2 rounded outline-none"
                    />
                    <textarea
                        placeholder="توضیحات محصول"
                        value={newProduct.description || ''}
                        onChange={(e) => setNewProduct(prev => ({...prev, description: e.target.value}))}
                        className="border p-2 rounded outline-none resize-none"
                        rows="3"
                    />
                </div>
                <div className="mt-6 flex justify-center gap-3">
                    <button
                        onClick={handleAddProduct}
                        className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded"
                    >
                        ثبت محصول
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                    >
                        لغو
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
