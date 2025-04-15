import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {ConvertCurrency} from "@/helper/text";

function ShippingInfo(props) {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone: '',
        province: '',
        city: '',
        postal: '',
        address: '',
        landline: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const provinces = ["خراسان رضوی", "تهران", "خراسان جنوبی", "خراسان شمالی"];

    const state = useSelector((state) => state.cart);



    return (
        <>
            <div className="container md:mr-20 mb-20 md:w-full h-auto flex flex-col md:flex-row items-start justify-between mt-20">
                <div className="flex flex-col w-[312px] m-auto md:w-[816px] pt-12 pb-12 md:h-[575px] items-center justify-center  md:items-start md:justify-between border border-slate-300">
                    <div className="flex flex-col md:mr-9 items-start justify-between text-[16px]">
                        <form className="m-auto flex flex-col items-start justify-center" action="@/components/client/template/ShippingInfo">
                            <div className="m-auto flex flex-col md:flex-row items-center justify-center">
                                {/* نام */}
                                <div className="flex flex-col items-start justify-between md:w-[372px] h-[82px]">
                                    <label htmlFor="name" className="text-black">نام*</label>
                                    <input type="text" placeholder="نام خود را کامل کنید"
                                           className="text-black pr-2 w-[264px] md:w-[372px] h-[50px] border-slate-300 rounded border outline-0"
                                           value={formData.name} onChange={handleChange} id="name" name="name"/>
                                </div>
                                {/* نام خانوادگی */}
                                <div className="flex flex-col mr-2 mt-5 md:mt-0 items-start justify-between md:w-[372px] h-[82px]">
                                    <label htmlFor="lastname" className="text-black">نام خانوادگی*</label>
                                    <input type="text" placeholder="نام خانوادگی کامل کنید"
                                           className="pr-2 text-black w-[264px] md:w-[372px] h-[50px] border-slate-300 rounded border outline-0"
                                           value={formData.lastname} onChange={handleChange} id="lastname" name="lastname"/>
                                </div>
                            </div>
                            {/* شماره موبایل */}
                            <div className="flex flex-col mt-5 items-start justify-between w-[264px] md:w-[372px] h-[82px]">
                                <label htmlFor="phone" className="text-black mr-2 md:mr-0">شماره موبایل*</label>
                                <input type="number" placeholder="شماره همراه خود را کامل کنید"
                                       className="text-black mr-2 md:mr-0 pr-2 w-[264px] md:w-[372px] h-[50px] border-slate-300 rounded border outline-0"
                                       value={formData.phone} onChange={handleChange} id="phone" name="phone"/>
                            </div>
                        </form>
                    </div>
                    <div className="text-black flex">
                        <form action="@/components/client/template/ShippingInfo" className="flex flex-col md:items-start justify-between">
                            <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
                                {/* استان */}
                                <div className="flex items-start md:mr-9 mt-5 flex-col">
                                    <label htmlFor="province">استان*</label>
                                    <select
                                        value={formData.province}
                                        onChange={handleChange}
                                        id="province"
                                        name="province"
                                        className=" w-[264px] md:w-[236px] mt-2 h-[50px] outline-0 border-slate-300 border rounded"
                                    >
                                        <option value="">انتخاب استان</option>
                                        {provinces.map((prov) => (
                                            <option key={prov} value={prov}>{prov}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* شهر */}
                                <div className="flex items-start md:mr-5 mt-5 flex-col">
                                    <label htmlFor="city">شهر*</label>
                                    <select
                                        value={formData.city}
                                        onChange={handleChange}
                                        id="city"
                                        name="city"
                                        className="w-[264px] md:w-[236px] mt-2 h-[50px] outline-0 border-slate-300 border rounded"
                                    >
                                        <option value="">انتخاب شهر</option>
                                        {provinces.map((city) => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                                {/* کد پستی */}
                                <div className="flex flex-col mt-5 md:mr-5 items-start justify-between md:w-[372px] h-[82px]">
                                    <label htmlFor="postal" className="text-black">کدپستی*</label>
                                    <input type="number" placeholder="کد پستی"
                                           className="text-black pr-2 w-[264px] md:w-[236px] h-[50px] border-slate-300 rounded border outline-0"
                                           value={formData.postal} onChange={handleChange} id="postal" name="postal"/>
                                </div>
                            </div>
                            {/* آدرس */}
                            <div className="flex flex-col md:mr-9 mt-5 items-start justify-between md:w-[372px] h-[82px]">
                                <label htmlFor="address" className="text-black">آدرس پستی*</label>
                                <input type="text" placeholder="آدرس خود را وارد کنید"
                                       className="text-black pr-2 w-[264px] md:w-[752px] h-[50px] border-slate-300 rounded border outline-0"
                                       value={formData.address} onChange={handleChange} id="address" name="address"/>
                            </div>
                        </form>
                    </div>
                    <div>
                        <form action="@/components/client/template/ShippingInfo" className="flex flex-col items-start  md:flex-row justify-start">
                            {/* تلفن ثابت */}
                            <div className="flex flex-col md:mr-9 mt-5 md:items-start justify-between h-[82px]">
                                <label htmlFor="landline" className="text-black">تلفن ثابت (اختیاری)</label>
                                <input type="text" placeholder="تلفن ثابت کامل کنید"
                                       className="pr-2 text-black w-[264px] md:w-[236px] h-[50px] border-slate-300 rounded border outline-0"
                                       value={formData.landline} onChange={handleChange} id="landline" name="landline"/>
                            </div>
                            <div className="flex flex-col md:mr-9 mt-5 items-start justify-between h-[82px]">
                                <label htmlFor="landline" className="text-black">تلفن ثابت (اختیاری)</label>
                                <input type="text" placeholder="تلفن ثابت کامل کنید"
                                       className="pr-2 text-black w-[264px] md:w-[494px] h-[50px] border-slate-300 rounded border outline-0"
                                       value={formData.landline} onChange={handleChange} id="landline" name="landline"/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-16 md:mt-0 m-auto w-[312px] md:w-[384px] h-[320px] border border-gray-300">
                    <div className="w-[264px] md:w-[336px] h-[56px] border rounded border-gray-300 m-auto mt-5 flex items-center justify-between">
                        <input type="text" placeholder="کد تخفیف" className="mr-3 text-[#626262] w-[100px] outline-0 h-[30px]"/>
                        <div className="w-[104px] md:w-[138px] h-[44px] ml-2 rounded cursor-pointer flex items-center bg-slate-200 justify-center">
                            <span className="text-slate-300">اعمال تخفیف</span>
                        </div>
                    </div>
                    <div className="text-black flex w-[264px] md:w-[336px] m-auto justify-between mt-8 border-b-2 pb-5 border-slate-300">
                        <span className="text-[16px] text-[#626262]">قیمت کالا:</span>
                        <p className="text-[16px] text-[#626262]">{ConvertCurrency(state.total)}تومان</p>
                    </div>
                    <div className="text-black flex w-[264px] md:w-[336px] m-auto justify-between mt-8 ">
                        <span className="text-[16px] text-[#626262]">قیمت کالا:</span>
                        <p className="text-[16px] text-red-600">{ConvertCurrency(state.total)}تومان</p>
                    </div>
                    <div className="w-[280px] md:w-[336px] h-[42px] bg-[#3083FF] m-auto flex items-center justify-center mt-10 mb-5 rounded">
                        <button>نهایی سازی سفارش</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShippingInfo;