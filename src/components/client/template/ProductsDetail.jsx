import React, {useState, useRef, useEffect} from "react";
import Image from "next/image";
import {CiShoppingCart} from "react-icons/ci";
import {IoIosHeart} from "react-icons/io";
import CardProduct from "@/components/client/module/CardProduct";
import {motion} from "framer-motion";
import Title from "@/components/client/template/Title";
import {useGetProductsQuery} from "@/redux/features/api/apiSlice";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import {DataComment} from "@/utils/Users";
import CardComment from "@/components/client/module/CardComment";
import {BsVectorPen} from "react-icons/bs";
import {CiUser} from "react-icons/ci";
import {useDispatch, useSelector} from "react-redux";
import {AddITEM, addToFavorites} from "@/redux/features/Cart/cartSlice";
import {ConvertCurrency, quantityitms} from "@/helper/text";
import {toast, Toaster} from "sonner";

function ProductsDetail({data}) {
    const {id, title, description, images, price} = data;
    const [activeIndex, setActiveIndex] = useState(0);
    const dispatch = useDispatch()
    const state = useSelector((store) => store.cart);
    console.log(state)
    const [colorHeart, setColorHeart] = useState(false);
    const [view, setView] = useState("")
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [mainImage, setMainImage] = useState(images[0]);
    const [chest, setChest] = useState("");
    const [hips, setHips] = useState("");
    const [finalSize, setFinalSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [suggestedColor, setSuggestedColor] = useState(null);
    const {data: Products, error, isLoading} = useGetProductsQuery();
    const scrollContainerRef = useRef(null);
    const quantity = quantityitms(state, id)
    useEffect(() => {
        const handleScroll = () => {
            if (scrollContainerRef.current) {
                const scrollIndex = Math.floor(scrollContainerRef.current.scrollTop / 60);
                if (images[scrollIndex]) {
                    setMainImage(images[scrollIndex]);
                }
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, [images]);

    const handleSubmit = () => {
        if (chest && hips) {
            setFinalSize(`دور سینه شما ${chest} سانتی‌متر و دور باسن شما ${hips} سانتی‌متر است.`);
        } else {
            setFinalSize("لطفاً هر دو مقدار را وارد کنید.");
        }
    };

    const handleColorClick = (colorName) => {
        setSelectedColor(colorName);
        setSuggestedColor(null); // پاک کردن رنگ پیشنهادی در صورت انتخاب رنگ اصلی
    };

    const handleSuggestedColorClick = (colorName) => {
        setSuggestedColor(colorName);
        setSelectedColor(null); // پاک کردن رنگ اصلی در صورت انتخاب رنگ پیشنهادی
    };

    const colors = [
        {name: "صورتی", code: "bg-[#FFD0EC]"},
        {name: "بنفش", code: "bg-[#81689D]"},
        {name: "آبی تیره", code: "bg-[#474F7A]"},
        {name: "سرمه‌ای", code: "bg-[#1F2544]"},
        {name: "مشکی", code: "bg-[#111111]"}
    ];

    const indicatorsCount = 5;

// در متد onClick دکمه "افزودن به سبد خرید":
    const handleAddToCart = () => {
        const finalColor = selectedColor || suggestedColor || 'رنگ پیش‌فرض'; // مقدار پیش‌فرض برای رنگ
        const chestValue = Number(chest);
        const hipsValue = Number(hips);

        if (finalColor && chestValue > 0 && hipsValue > 0) {
            dispatch(AddITEM({
                ...data,
                colors: finalColor,
                size: `سایز سینه ${chestValue} - سایز باسن ${hipsValue}`
            }));
            toast.success("اضافه به سبد خرید شد", {
                position: "top-center",
                duration: 3000
            });

        } else {
            toast.error("لطفاً رنگ و سایز خود را انتخاب کنید.", {
                position: "top-center",
                duration: 3000
            });
        }
    };


    const toggleFavorite = () => {
        dispatch(addToFavorites(data))
        setColorHeart(!colorHeart)
    }


    return (
        <div className="container m-auto mt-16">
            <Toaster expand={true} position="top-center" richColors/>
            <div className="md:hidden">
                <Title name="محصولات ما"/>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
                {/* Section 1: Description */}
                <div className="w-full md:w-[321px] h-[500px] border border-[#CACACA] p-5 rounded">
                    <span className="text-black text-[20px] flex items-center justify-center text-center font-medium">پیراهن ماکسی سوفیا</span>
                    <div className="flex flex-col items-start justify-between">
                        <div className="flex items-end justify-end mt-5 text-black">
                            <span className="text-black text-[30px] mb-2">.</span>
                            <p className="mr-2 font-medium">مدل یقه: دکلته، برای تأکید بر زیبایی سرشانه‌ها و گردن</p>
                        </div>
                        <div className="flex items-end justify-end mt-5 text-black">
                            <span className="text-black text-[30px] mb-2">.</span>
                            <p className="mr-2 font-medium">جنس پارچه: گیپور شاین‌دار با بافتی لوکس و درخشان که نور را
                                به زیبایی منعکس می‌کند</p>
                        </div>
                        <div className="flex items-end justify-end mt-5 text-black">
                            <span className="text-black text-[30px] mb-2">.</span>
                            <p className="mr-2 font-medium">سایزبندی: ۳۸ تا ۴۴، متناسب با فرم‌های مختلف بدن</p>
                        </div>
                        <div className="flex items-end justify-end mt-5 text-black">
                            <span className="text-black text-[30px] mb-2">.</span>
                            <p className="mr-2 font-medium">مناسب برای اندام‌های: بیضی، ساعت شنی و مثلث وارونه</p>
                        </div>
                        <div className="flex items-end justify-end mt-5 text-black">
                            <span className="text-black text-[30px] mb-2">.</span>
                            <p className="mr-2 font-medium">استایل: شیک، مجلل و خاص، مناسب برای عروس‌هایی که به دنبال
                                لباسی متفاوت و درخشان هستند</p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Gallery */}
                <div className="flex  mt-5 md:mt-0">
                    <div
                        className="h-[400px] w-[100px] md:w-[70px] border-0 overflow-y-scroll border border-gray-300 rounded-md p-2 custom-scrollbar">
                        {images.map((image, index) => (
                            <div key={index} className="p-1 cursor-pointer" onClick={() => setMainImage(image)}>
                                <Image src={image} width={55} height={65} alt="Thumbnail"
                                       className="rounded-md border hover:border-blue-500"/>
                            </div>
                        ))}
                    </div>
                    <div className="relative md:mr-5 mt-2 md:mt-0">
                        <div className="absolute top-5 right-5 text-[24px] flex cursor-pointer">
                            <IoIosHeart
                                onClick={toggleFavorite}
                                color={state.favorites?.find(item => item.id === id) ? "red" : "black"}
                                size={24}
                            />
                        </div>
                        <Image src={mainImage} width={337} height={480} alt="Main Image"
                               className="rounded-lg w-[248px] md:w-auto"/>
                    </div>
                </div>

                {/* Section 3: Size Form */}
                <div className="flex flex-col mt-5 md:mt-0">
                    <div className="w-full md:w-[321px] h-[400px] border border-[#CACACA] rounded shadow-2xl p-5">
                        <div className="flex flex-col items-center">
                            <div className="flex mt-5 justify-center">
                                <div className="text-black flex flex-col ml-5">
                                    <label htmlFor="chest" className="text-[12px] mb-1">دور سینه خود را وارد
                                        کنید</label>
                                    <input className="w-[129px] h-[38px] pr-2 outline-0 border border-[#626262]"
                                           type="number" placeholder="مثلاً 98" id="chest" name="chest" value={chest}
                                           onChange={(e) => setChest(e.target.value)}/>
                                </div>
                                <div className="text-black flex flex-col">
                                    <label htmlFor="hips" className="text-[12px] mb-1">دور باسن خود را وارد کنید</label>
                                    <input className="w-[129px] h-[38px] pr-2 outline-0 border border-[#626262]"
                                           type="number" placeholder="مثلاً 104" id="hips" name="hips" value={hips}
                                           onChange={(e) => setHips(e.target.value)}/>
                                </div>
                            </div>
                            <div
                                className="w-[181px] h-[38px] border border-[#CACACA] mt-5 flex items-center justify-center text-black text-[12px] cursor-pointer">
                                <button type="button" onClick={handleSubmit}>ارسال سایز شما</button>
                            </div>
                        </div>

                        <div className="mt-0 text-center border-b border-[#626262] w-full pt-2 pb-2">
                            <span className="text-black text-[12px]">{finalSize || "لطفاً مقادیر را وارد کنید."}</span>
                        </div>

                        <div className="flex flex-col mt-4 pb-2 border-b border-[#626262]">
                            <span className="text-black">رنگ: {selectedColor}</span>
                            <div className="flex mt-2">
                                {colors.map((color) => (
                                    <button key={color.name}
                                            className={`${color.code} w-[20px] h-[20px] mr-2 border border-gray-300 rounded-full`}
                                            onClick={() => handleColorClick(color.name)}>
                                        {selectedColor === color.name && <span
                                            className="text-white font-bold text-sm flex items-center justify-center">✓</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col mt-2">
                            <span className="text-black">رنگ های پیشنهادی برای استایلیست</span>
                            <div className="flex mt-5 items-end justify-end">
                                {colors.map((color) => (
                                    <button key={color.name}
                                            className={`${color.code} w-[25px] h-[25px] mr-2 border border-gray-300 rounded-full`}
                                            onClick={() => handleSuggestedColorClick(color.name)}>
                                        {suggestedColor === color.name && <span
                                            className="text-white font-bold text-sm flex items-center justify-center">✓</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {
                        quantity === 0 ? (
                            <div
                                className="font-normal cursor-pointer shadow-2xl text-white text-[20px] mt-10 w-full md:w-[321px] bg-[#6E8E59] h-[61px] flex items-center justify-center"
                                onClick={handleAddToCart}>
                                <CiShoppingCart/>
                                <span className="mr-3">افزودن به سبد خرید</span>
                            </div>
                        ) : ""
                    }

                </div>
            </div>

            <div className="mt-36">
                <div className="w-[211px] text-black ">
                    <span className="text-black text-[30px]">
                        محصولات مشابه
                    </span>
                    <p className="w-[150px] h-[3px] bg-black"></p>
                </div>
                <div className="flex w-full flex-wrap mt-10">
                    <div className="flex items-center justify-center flex-wrap w-auto ">
                        {Array.isArray(Products) && Products.slice(0, 8).map((item) => <CardProduct data={item}
                                                                                                    key={item.id}/>)}
                    </div>
                </div>

                <div className="flex items-center justify-center  mt-16">
                    <div className="w-full mt-10">
                        <motion.div
                            initial={{opacity: 0, y: -20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, ease: "easeOut"}}
                            viewport={{once: true}}
                        >
                            <div className="flex flex-col">
                                <h2 className="text-black text-2xl font-bold text-center pb-2">نظرات مشتریان</h2>
                                <p className="w-[150px] h-[3px] bg-black m-auto"></p>
                            </div>

                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, y: 50}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, ease: "easeOut"}}
                            viewport={{once: true, amount: 0.2}}
                            className="relative w-full mt-10"
                        >
                            <Swiper
                                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex % indicatorsCount)}
                                slidesPerView={2}
                                centeredSlides={true}
                                freeMode={true}
                                loop={true}
                                autoplay={{
                                    delay: 6000,
                                    disableOnInteraction: false,
                                }}
                                modules={[FreeMode]}
                                className="mySwiper"
                                breakpoints={{
                                    480: {slidesPerView: 1, spaceBetween: 30},
                                    640: {slidesPerView: 2, spaceBetween: 15},
                                    768: {slidesPerView: 3, spaceBetween: 15},
                                    1024: {slidesPerView: 4, spaceBetween: 25},
                                }}
                            >
                                {DataComment && Array.isArray(DataComment) && DataComment.length > 0 ? (
                                    DataComment.map((item, index) => (
                                        <SwiperSlide
                                            key={item.id || index}
                                            className="transition-all duration-500 mr-5  pt-16"
                                        >
                                            <motion.div
                                                initial={{opacity: 0, y: 50}}
                                                whileInView={{opacity: 1, y: 0}}
                                                transition={{
                                                    duration: 0.6,
                                                    ease: "easeOut",
                                                    delay: index * 0.1,
                                                }}
                                                viewport={{once: true, amount: 0.2}}
                                            >
                                                <CardComment data={item}/>
                                            </motion.div>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <p className="text-center mt-5">هیچ کامنتی یافت نشد!</p>
                                )}
                            </Swiper>

                            {/* Indicators */}
                            <div className="flex justify-center mt-5 space-x-2">
                                {Array.from({length: indicatorsCount}).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-5 h-3 rounded-full transition-all duration-300 ${
                                            index === activeIndex ? "bg-black scale-125" : "bg-gray-300"
                                        }`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <form action="@/components/client/template/ProductsDetail" className="flex flex-col items-start md:items-center mr-3 md:mr-0">
                    <div className="flex flex-col items-start">
                        <div className="flex items-center text-black">
                            <BsVectorPen/>
                            <label htmlFor="view" className="text-black mr-3 text-[16px]">دیدگاه خود راشرح دهید</label>
                        </div>
                        <input type="text" id={view} name={view}
                               className="w-[312px]  md:w-[744px] h-[67px] mt-5 rounded-lg pr-2 text-black border border-[#626262]"
                               placeholder="نظرات وسوالات شما" value={view} onChange={(e) => setView(e.target.value)}/>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center mt-5 md:mt-10">
                        <div className="flex flex-col items-start">
                            <div className="flex text-black items-center">
                                <CiUser/>
                                <label htmlFor="user" className="mr-2">نام کاربری</label>
                            </div>
                            <input type="text" id={user} name={user}
                                   className="border mt-2 w-[312px] md:w-[360px] h-[67px] rounded-lg text-black border-[#626262]"
                                   placeholder="نظرات وسوالات شما" value={user}
                                   onChange={(e) => setUser(e.target.value)}/>
                        </div>
                        <div className="flex flex-col items-start mt-5 md:mt-0 md:mr-10">
                            <div className="flex text-black items-center">
                                <span>@</span>
                                <label htmlFor="email" className="mr-2">ایمیل</label>
                            </div>
                            <input type="text" id={email} name={email}
                                   className="border mt-2 w-[312px] md:w-[360px] h-[67px] rounded-lg text-black border-[#626262]"
                                   placeholder="نظرات وسوالات شما" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div
                        className="w-[312px] md:w-[744px] h-[67px] bg-[#6E8E59] mt-10 flex items-center justify-center rounded cursor-pointer">
                        <button type="submit">افزودن دیدگاه</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default ProductsDetail;
