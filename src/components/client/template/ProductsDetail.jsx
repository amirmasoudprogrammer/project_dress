import React, {useState, useRef, useEffect} from "react";
import Image from "next/image";
import {CiShoppingCart} from "react-icons/ci";
import {IoIosHeart} from "react-icons/io";
import Title from "@/components/client/template/Title";
import "swiper/css";
import "swiper/css/free-mode";
import {useDispatch, useSelector} from "react-redux";
import {AddITEM, addToFavorites} from "@/redux/features/Cart/cartSlice";
import {quantityitms} from "@/helper/text";
import {toast, Toaster} from "sonner";
import SimilarProduct from "@/components/client/module/SimilarProduct";
import CommentPost from "@/components/client/module/CommentPost";
import CreateComment from "@/components/client/module/CreateComment";
import SelectedColorDetailProduct from "@/components/client/module/SelectedColorDetailProduct";

function ProductsDetail({data}) {
    console.log(data.data.product)
    const {product_colors, name, description, featured_image, id, images} = data.data.product
    const dispatch = useDispatch()
    const state = useSelector((store) => store.cart);
    const [colorHeart, setColorHeart] = useState(false);
    const [mainImage, setMainImage] = useState(featured_image);
    const [chest, setChest] = useState("");
    const [hips, setHips] = useState("");
    const [finalSize, setFinalSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [suggestedColor, setSuggestedColor] = useState(null);
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
        const chestNum = Number(chest);
        const hipsNum = Number(hips);

        if (
            chestNum >= 55 && chestNum <= 98 &&
            hipsNum >= 0 && hipsNum <= 100
        ) {
            setFinalSize("سایز شما: ۱");
        } else if (
            chestNum > 98 && chestNum <= 112 &&
            hipsNum > 100 && hipsNum <= 118
        ) {
            setFinalSize("سایز شما: ۲");
        } else {
            setFinalSize("سایز شما در دسته‌بندی موجود نیست.");
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

                <div className="w-full md:w-[340px] min-h-[500px] border border-[#CACACA] p-6 rounded-xl bg-white shadow-sm">
                    {/* نام محصول */}
                    <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">{name}</h2>

                    {/* جزئیات محصول */}
                    <div className="flex flex-col gap-5 text-sm text-gray-700 leading-relaxed max-h-96 overflow-y-auto">
                        {/* توضیحات اصلی */}
                        <div className="flex items-start gap-2">
                            <span className="text-2xl text-pink-500 leading-none">•</span>
                            <p className="font-medium">{description}</p>
                        </div>
                    </div>

                </div>


                <div className="flex  mt-5 md:mt-0">
                    <div
                        className="h-[400px] w-[100px] md:w-[70px] border-0 overflow-y-scroll border border-gray-300 rounded-md p-2 custom-scrollbar">
                        {images.map((image, index) => (
                            <div key={index} className="p-1 cursor-pointer"
                                 onClick={() => setMainImage(image.image_path)}>
                                <Image src={image.image_path} width={55} height={65} alt="Thumbnail"
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
                        <Image src={mainImage} width={500} height={500} alt="Main Image"
                               className="rounded-lg w-[300px] md:w-[250px]"/>
                    </div>
                </div>


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

                        <SelectedColorDetailProduct suggestedColor={suggestedColor} selectedColor={selectedColor} product_colors={product_colors} handleColorClick={handleColorClick} handleSuggestedColorClick={handleSuggestedColorClick}/>
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

            <SimilarProduct/>
            <CommentPost id={data.data.product.id}/>
            <CreateComment id={data.data.product.id}/>
        </div>

    );
}

export default ProductsDetail;
