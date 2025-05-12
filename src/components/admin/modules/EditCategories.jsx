import React, {useEffect, useState} from 'react';
import {toast} from "sonner";
import axios from "axios";

function EditCategories({popupEdit , setPopupEdit}) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [is_active, setIs_active] = useState("1");

    useEffect(() => {
        if (popupEdit.show && popupEdit.item) {
            setName(popupEdit.item.name || "");
            setDescription(popupEdit.item.description || "");
            setIs_active(popupEdit.item.is_active ? 1 : 0);
        }
    }, [popupEdit]);


    const handleEditSubmit = async () => {


        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description );
        formData.append("is_active",is_active);
        formData.append("_method","PUT");

        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await axios.post(`https://joppin.ir/api/v1/admin/categories/${popupEdit.item.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            });
            console.log(res)
            if (res.status === 201){
                toast.success("دسته‌بندی با موفقیت ویرایش شد.");
                setPopupEdit({show: false, item: null});
            }


        } catch (error) {
            toast.error("ویرایش با خطا مواجه شد.");
            console.error(error);
        }
    };

    return (
      <>
          {popupEdit.show && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
                  <div className="bg-white p-6 rounded-lg shadow-md w-[400px]">
                      <h2 className="text-lg font-bold mb-4">ویرایش دسته‌بندی</h2>
                      <div className="mb-3">
                          <label className="block text-sm font-medium text-right">نام</label>
                          <input
                              name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full border rounded p-2 mt-1 text-sm"
                          />
                      </div>
                      <div className="mb-3">
                          <label className="block text-sm font-medium text-right">توضیحات</label>
                          <textarea
                              name="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows={3}
                              className="w-full border rounded p-2 mt-1 text-sm"
                          />
                      </div>
                      <div className="mb-3">
                          <label className="block text-sm font-medium text-right">تصویر</label>
                          <input
                              type="file"
                              name="image"
                              onChange={(e) => setImage(e.target.files[0])}
                              className="w-full border rounded p-2 mt-1 text-sm"
                          />
                      </div>
                      <div className="mb-3 flex items-center justify-between">
                          <label>وضعیت</label>
                          <select
                              name="is_active"
                              value={is_active}
                              className="w-full border p-2 rounded mt-2"
                              onChange={(e) => setIs_active(Number(e.target.value))}
                          >
                              <option value={1}>فعال</option>
                              <option value={0}>غیرفعال</option>
                          </select>

                      </div>
                      <div className="flex justify-between mt-5">
                          <button
                              onClick={() => setPopupEdit({show: false, item: null})}
                              className="px-4 py-2 bg-gray-400 text-white rounded text-sm"
                          >
                              انصراف
                          </button>
                          <button
                              onClick={handleEditSubmit}
                              className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                          >
                              ذخیره تغییرات
                          </button>
                      </div>
                  </div>
              </div>
          )}
      </>
    );
}

export default EditCategories;