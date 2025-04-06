"use client"
import React, {useState} from 'react';
import {HiOutlineArrowLongLeft} from "react-icons/hi2";
import { motion, AnimatePresence } from 'framer-motion';



function TicketPageNew(props) {
    const [isVisible, setIsVisible] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [faqList] = useState([
        {
            id:1,
            title: "مشتری یابی میکنم و نتیجه خاصی نگرفته ام، باید چه کار کنم؟",
            description: "عدم نتیجه گیری از مشتری یابی به عوامل مختلفی بستگی دارد که باید بررسی شود..."
        },
        {
            id:2,
            title: "مشتری یابی میکنم و نتیجه خاصی نگرفته ام، باید چه کار کنم؟",
            description: "برای شروع نیاز دارید ابتدا خدمات خود را واضح مشخص کنید..."
        },
        {
            id:3,
            title: "مشتری یابی میکنم و نتیجه خاصی نگرفته ام، باید چه کار کنم؟",
            description: "بازار هدف گروهی از مشتریان هستند که به احتمال زیاد از خدمات شما استفاده خواهند کرد..."
        },
        {
            id:4,
            title: "مشتری یابی میکنم و نتیجه خاصی نگرفته ام، باید چه کار کنم؟",
            description: "پیام باید جذاب، کوتاه، و مرتبط با نیاز مشتری نوشته شود..."
        },
        {
            id:5,
            title: "مشتری یابی میکنم و نتیجه خاصی نگرفته ام، باید چه کار کنم؟",
            description: "با دسته‌بندی پاسخ‌ها و مشاهده الگوها، می‌توانید تحلیل بهتری داشته باشید..."
        },
    ]);
    const [selectedFaq, setSelectedFaq] = useState(null);




    return (
        <>
            <div className="mt-10 hidden md:flex flex-col  w-[831px] ">
                <div className="border h-[650px] border border-slate-300 rounded-xl mr-2">
                    <div className="flex flex-col items-start justify-between mt-5 mr-5">
                        <span className="text-black text-[12px] font-bold">سوالات متداول</span>
                        <p className="w-[50px] h-[2px] bg-red-500 mt-1"></p>
                    </div>
                    <div className="text-start text-[12px] p-5 text-black border-b border-slate-300">
                        <span className="font-medium">مشتری یابی میکنم و نتیجه خاصی نگرفته ام، باید چه کار کنم؟</span>
                        <p className="text-slate-500">
                            عدم نتیجه گیری از مشتری یابی به عوامل مختلفی بستگی دارد که باید بررسی شود. برای اینکه
                            بتوانیم بهتر کمک تان کنیم لطفا موارد زیر به طور کامل در یک تیکت به کوچ ارسال کنید. خدمات شما
                            چیست؟ بازار هدف شما چه کسانی هستند؟ کجا پیام مشتری یابی ارسال می کنید؟ چند روز هست که به
                            صورت مستمر مشتری یابی می کنید؟ در مجموع چند پیام مشتری یابی ارسال کردید؟ آیا کسی به شما جواب
                            داده است؟ چند نفر؟ نمونه ای پیام مشتری یابی خود را ارسال بفرمایید.
                        </p>
                    </div>
                    <div className="text-start text-[12px] p-5 text-black border-b border-slate-300">
                        <span className="font-medium">مشتری یابی میکنم و نتیجه خاصی نگرفته ام، باید چه کار کنم؟</span>
                        <p className="text-slate-500">
                            عدم نتیجه گیری از مشتری یابی به عوامل مختلفی بستگی دارد که باید بررسی شود. برای اینکه
                            بتوانیم بهتر کمک تان کنیم لطفا موارد زیر به طور کامل در یک تیکت به کوچ ارسال کنید. خدمات شما
                            چیست؟ بازار هدف شما چه کسانی هستند؟ کجا پیام مشتری یابی ارسال می کنید؟ چند روز هست که به
                            صورت مستمر مشتری یابی می کنید؟ در مجموع چند پیام مشتری یابی ارسال کردید؟ آیا کسی به شما جواب
                            داده است؟ چند نفر؟ نمونه ای پیام مشتری یابی خود را ارسال بفرمایید.
                        </p>
                    </div>
                    <div className="text-start text-[12px] p-5 text-black border-b border-slate-300">
                        <span className="font-medium">مشتری یابی میکنم و نتیجه خاصی نگرفته ام، باید چه کار کنم؟</span>
                        <p className="text-slate-500">
                            عدم نتیجه گیری از مشتری یابی به عوامل مختلفی بستگی دارد که باید بررسی شود. برای اینکه
                            بتوانیم بهتر کمک تان کنیم لطفا موارد زیر به طور کامل در یک تیکت به کوچ ارسال کنید. خدمات شما
                            چیست؟ بازار هدف شما چه کسانی هستند؟ کجا پیام مشتری یابی ارسال می کنید؟ چند روز هست که به
                            صورت مستمر مشتری یابی می کنید؟ در مجموع چند پیام مشتری یابی ارسال کردید؟ آیا کسی به شما جواب
                            داده است؟ چند نفر؟ نمونه ای پیام مشتری یابی خود را ارسال بفرمایید.
                        </p>
                    </div>
                    <div className="text-start text-[12px] p-5 text-black border-b border-slate-300">
                        <span className="font-medium">مشتری یابی میکنم و نتیجه خاصی نگرفته ام، باید چه کار کنم؟</span>
                        <p className="text-slate-500">
                            عدم نتیجه گیری از مشتری یابی به عوامل مختلفی بستگی دارد که باید بررسی شود. برای اینکه
                            بتوانیم بهتر کمک تان کنیم لطفا موارد زیر به طور کامل در یک تیکت به کوچ ارسال کنید. خدمات شما
                            چیست؟ بازار هدف شما چه کسانی هستند؟ کجا پیام مشتری یابی ارسال می کنید؟ چند روز هست که به
                            صورت مستمر مشتری یابی می کنید؟ در مجموع چند پیام مشتری یابی ارسال کردید؟ آیا کسی به شما جواب
                            داده است؟ چند نفر؟ نمونه ای پیام مشتری یابی خود را ارسال بفرمایید.
                        </p>
                    </div>
                    <div className="text-start text-[12px] p-5 text-black ">
                        <span className="font-medium">مشتری یابی میکنم و نتیجه خاصی نگرفته ام، باید چه کار کنم؟</span>
                        <p className="text-slate-500">
                            عدم نتیجه گیری از مشتری یابی به عوامل مختلفی بستگی دارد که باید بررسی شود. برای اینکه
                            بتوانیم بهتر کمک تان کنیم لطفا موارد زیر به طور کامل در یک تیکت به کوچ ارسال کنید. خدمات شما
                            چیست؟ بازار هدف شما چه کسانی هستند؟ کجا پیام مشتری یابی ارسال می کنید؟ چند روز هست که به
                            صورت مستمر مشتری یابی می کنید؟ در مجموع چند پیام مشتری یابی ارسال کردید؟ آیا کسی به شما جواب
                            داده است؟ چند نفر؟ نمونه ای پیام مشتری یابی خود را ارسال بفرمایید.
                        </p>
                    </div>
                </div>
                <div className="relative left-96 mt-10 justify-start mr-5  ml-auto flex items-end">
                    <div>
                        <span className="text-black">پیام پشتیبانی جدید</span>
                        <div className="flex items-start justify-start mt-8 mb-10">
                            <form>
                                <div className="text-black flex flex-col items-start justify-start">
                                    <label className="text-black" htmlFor="title">عنوان تیکت</label>
                                    <input
                                        className="w-[800px] mt-2 h-[35px] outline-0 border border-slate-400 rounded "
                                        type="text"/>
                                </div>
                                <div className="text-black flex flex-col items-start justify-start">
                                    <label className="text-black" htmlFor="department">دپارتمان</label>
                                    <select id="department" name="department"
                                            className="w-[800px] mt-2 h-[35px] outline-0 border border-slate-400 rounded">
                                        <option value="">لطفاً یک دپارتمان را انتخاب کنید</option>
                                        <option value="support">پشتیبانی</option>
                                        <option value="sales">فروش</option>
                                        <option value="technical">فنی</option>
                                    </select>
                                </div>
                                <div className="text-black flex flex-col items-start justify-start ">
                                    <label className="text-black" htmlFor="section">بخش</label>
                                    <select id="section" name="section"
                                            className="w-[800px] mt-2 h-[35px] outline-0 border border-slate-400 rounded">
                                        <option value="">لطفاً یک بخش را انتخاب کنید</option>
                                        <option value="website">وب‌سایت</option>
                                        <option value="app">اپلیکیشن</option>
                                        <option value="payment">پرداخت</option>
                                        <option value="other">سایر</option>
                                    </select>
                                </div>
                                <div className="text-black flex flex-col items-start justify-start">
                                    <label className="text-black" htmlFor="title">پیام</label>
                                    <textarea
                                        className="w-[800px] mt-2 h-[279px] outline-0 border border-slate-400 rounded resize-none"
                                    ></textarea>
                                </div>
                                <div
                                    className="w-[180px] h-[40px] bg-[#007AFF] mt-5 flex items-center justify-center rounded mr-auto">
                                    <button>ارسال پیام</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {isVisible && (
                <div className="flex md:hidden mt-20 flex-col ">
                    <div className="flex flex-col items-start justify-between mt-5  ">
                        <span className="text-black text-[12px] font-bold">سوالات متداول</span>
                        <p className="w-[50px] h-[2px] bg-red-500 mt-1"></p>
                    </div>
                    <div className="mt-5 ">
                        {faqList.map((faq, index) => (
                            <div key={faq.id} className="border border-slate-400 mt-2 rounded w-[240px] m-auto h-[74px] p-2">
                                <span className="text-black text-[12px] font-medium">{faq.title}</span>
                                <div   onClick={() => {
                                    setSelectedFaq(faq);
                                    setShowPopup(true);
                                }} className="flex mr-10 -mt-5 items-center justify-center text-[#007AFF]">
                                    <span className="text-[10px]">مشاهده بیشتر</span>
                                    <HiOutlineArrowLongLeft/>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 flex items-center justify-center flex-col">
                        <span className="text-black text-center ">پیام پشتیبانی جدید</span>
                        <div className="flex items-start justify-start mt-8 mb-10">
                            <form>
                                <div className="text-black flex mr-2 flex-col items-start justify-start">
                                    <label className="text-black text-[12px] " htmlFor="title">عنوان تیکت</label>
                                    <input
                                        className=" mt-2 w-[240px] outline-0 border border-slate-400 rounded "
                                        type="text"/>
                                </div>
                                <div className="text-black mr-2 flex flex-col mt-2 items-start justify-start">
                                    <label className="text-black text-[12px]" htmlFor="department">دپارتمان</label>
                                    <select id="department" name="department"
                                            className=" mt-2 w-[240px] text-[12px] outline-0 border border-slate-400 rounded">
                                        <option value="">لطفاً یک دپارتمان را انتخاب کنید</option>
                                        <option value="support">پشتیبانی</option>
                                        <option value="sales">فروش</option>
                                        <option value="technical">فنی</option>
                                    </select>
                                </div>
                                <div className="text-black mr-2 flex flex-col items-start justify-start ">
                                    <label className="text-black text-[12px]" htmlFor="section">بخش</label>
                                    <select id="section" name="section"
                                            className=" mt-2 w-[240px] text-[12px] outline-0 border border-slate-400 rounded">
                                        <option value="">لطفاً یک بخش را انتخاب کنید</option>
                                        <option value="website">وب‌سایت</option>
                                        <option value="app">اپلیکیشن</option>
                                        <option value="payment">پرداخت</option>
                                        <option value="other">سایر</option>
                                    </select>
                                </div>
                                <div className="text-black mr-2 flex flex-col items-start justify-start">
                                    <label className="text-black text-[12px]" htmlFor="title">پیام</label>
                                    <textarea
                                        className=" mt-2 w-[240px] h-[125px] outline-0 border border-slate-400 rounded resize-none"
                                    ></textarea>
                                </div>
                                <div
                                    className="w-[166px] h-[36px] bg-[#007AFF] mt-5 flex items-center justify-center rounded mr-auto">
                                    <button>ارسال پیام</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <AnimatePresence>
                        {showPopup && selectedFaq && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                className="block md:hidden fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
                            >
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.8 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    className="bg-white p-5 rounded-xl w-[300px] shadow-xl"
                                >
                                    <h2 className="text-black font-bold text-lg mb-3">{selectedFaq.title}</h2>
                                    <p className="text-sm text-slate-600 mb-5">{selectedFaq.description}</p>
                                    <div className="flex justify-end gap-3">
                                        <button
                                            className="px-4 py-1 rounded bg-slate-200 text-black"
                                            onClick={() => {
                                                setShowPopup(false);
                                                setSelectedFaq(null);
                                            }}
                                        >
                                            بستن
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                </div>
            )}
        </>
    );
}

export default TicketPageNew;