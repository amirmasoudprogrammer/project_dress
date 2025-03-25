import React from 'react';
import Title from "@/components/template/Title";
import Link from "next/link";
import Image from "next/image";

function AboutPage(props) {
    return (
        <div className="container m-auto">
            <div className="-mt-20">
                <Title name="درباره ما"/>
            </div>
            <div className="border-b border-[#626262] pb-10">
                <p className="text-center m-auto text-black w-[296px] md:w-auto">
                    مزون الیزا، یک‌شوروم (فروشگاه) لباس مجلسی و کژوال زنانه است که نزدیک به ۱۲سالی است در زمینه مد و
                    پوشاک فعالیت می‌کند. برای سلیقه مشتریانش ارزش زیادی قائل می‌شود، مزون الیزا می‌کوشد تجربه‌های جدید و
                    هیجان‌انگیزی را برای همراهانش به ارمغان آورد. رسیدن به رضایت و خوشحالی مشتریان الیزا، نقطه آغازین
                    عشق الیزا به آن‌ها بوده و ذوق مشتریان برای تکرار تجربه بازدید و خرید از الیزا، نتیجه مطلوب و دلخواه
                    الیزا است. مزون الیزا تلاش می‌کند تا هرروز با خلق تجارب فراتر از انتظار، مسیر خود را پر از حس خوب
                    همراهانش طی کند.
                    رسیدن به رضایت و خوشحالی مشتریانش نتیجه مطلوب و دلخواه الیزا است و مسیر کاری این برند طی این چند سال
                    پر از حس خوب مشتریانش بوده است.
                    الیزا به تغییر، هیجان و صمیمیت معتقد است و بر این ایده است که لباسی که انتخاب می‌کنید باید با روحیه،
                    شخصیت و سلیقه شما سازگار باشد. پس دوستانه شما را برای انتخاب لباس‌هایتان همراهی می‌کند تا نیازتان با
                    داشتن لباس مورد علاقه‌ برطرف شود.
                    «الیزا» به دنبال تغییر است. خواسته اش درخشش شماست و تمام تلاشش این است که همه بتوانند تغییر را با
                    «الیزا» تجربه کنند. برند «الیزا» با توجه به مسیری که پشت سر گذاشته، در حال برداشتن قدم‌های بلندتری
                    به سوی فراهم کردن بستری گسترده‌تر و مناسب با شخصیت مخاطب‌هایش است تا سلیقه‌های بیشتری را پوشش دهد و
                    به افراد بیشتری حس رضایتمندی را هدیه کند. تغییر، ارزشی است که برای خود قائل می‌شوید این تغییر را
                    می‌توانید از «الیزا» شروع کنید
                </p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex flex-col-reverse md:flex-row items-start justify-between mt-10">
                    <div className="w-[312px] md:w-[244px] text-black mt-5 md:mt-0">
                        <span className="mt-3 text-[16px]">ارتباط باما</span>
                        <div className="mt-2">
                            <p className="text-[14px]">
                                آدرس فروشگاه: تهران، نیاوران، اطلس مال، طبقه G2، واحد 2053
                                آدرس: تهران، شهیدقندی – نیلوفر، خیابان شهید عبدالمجید صابونچی
                                تلفن: 26372651_ 021
                                تلفن:26379841_ 021
                                ایمیل: eliza gmail.com@

                            </p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="text-black md:mr-16 ">
                            <span className="text-[16px]">لینک های مفید</span>
                            <ul>
                                <li className="mt-2"><Link href="" className="text-[14px] font-medium">تماس با ما</Link></li>
                                <li className="mt-2"><Link href="" className="text-[14px] font-medium">محصولات ما</Link></li>
                                <li className="mt-2"><Link href="" className="text-[14px] font-medium">ورود وثبت نام</Link></li>
                                <li className="mt-2"><Link href="" className="text-[14px] font-medium">درباره ما</Link></li>
                                <li className="mt-2"><Link href="" className="text-[14px] font-medium">وبلاگ</Link></li>
                            </ul>
                        </div>
                        <div className="text-black mr-16">
                            <span className="text-[16px]">آخرین مطالب وبلاگ</span>
                            <ul>
                                <li className="mt-2"><Link href="" className="text-[14px] font-medium">تیم کارکنان</Link></li>
                                <li className="mt-2"><Link href="" className="text-[14px] font-medium">درخواست همکاری</Link></li>
                                <li className="mt-2"><Link href="" className="text-[14px] font-medium">فروشگاه ما</Link></li>
                                <li className="mt-2"><Link href="" className="text-[14px] font-medium">محصولات ما</Link></li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <Image src="/7515320-removebg-preview 1.png" width={302} height={302} alt="image"/>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;