import React  from 'react';
import Link from "next/link";
import Image from "next/image";

const menuItems = [
    {name: "صفحه اصلی", href: "/"},
    {name: "محصولات ما", href: "/products"},
    {name: "درباره ما", href: "/about"},
    {name: "تماس با ما", href: "/contact"},
    {name: "فروشگاه ما", href: "/store"},
];

const icons = [
    {src: "/Group 9.svg", alt: "Notifications", size: 20},
    {src: "/Sun.svg", alt: "Theme Toggle", size: 24},
    {src: "/Profile Add 1.svg", alt: "Profile", size: 24},
    {src: "/Bag 1.svg", alt: "Shopping Bag", size: 24},
];

function Header() {


    return (
        <header>
            {/* دسکتاپ */}
            <div className="container relative z-10 mt-2 mx-auto hidden md:flex flex-col items-end">
                <div className="w-full flex justify-between items-center">
                    {/* لوگو و منو */}
                    <div className="flex items-center justify-between">
                        <Link href="/" className="w-20">
                            <Image src="/Group 946.svg" alt="Logo" width={90} height={90}/>
                        </Link>

                        <nav>
                            <ul className="flex items-center mr-10 space-x-5 rtl:space-x-reverse">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.href} className="text-black relative flex flex-wrap gap-3">
                                            <p className="text-lg group relative w-max">
                                                <span className="font-normal text-sm">{item.name}</span>
                                                <span
                                                    className="absolute -bottom-1 right-0 w-0 transition-all h-0.5 bg-slate-50 group-hover:w-full"></span>
                                            </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* آیکون‌ها */}
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        {icons.map((icon, index) => (
                            <Link key={index} href="/">
                                <div
                                    className="bg-slate-200 shadow-lg p-3 rounded-full flex items-center justify-center w-12 h-12">
                                    <Image src={icon.src} alt={icon.alt} width={icon.size} height={icon.size}/>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* نوار جستجو */}
                <div className="flex mt-5 bg-slate-50 p-2 rounded w-[350px] items-center">
                    <Image src="/Search-01.svg" alt="Search Icon" width={20} height={20}/>
                    <input type="text" className="w-full outline-none text-black pr-2" placeholder="جستجو کنید..."/>
                </div>
            </div>

            {/* موبایل */}
            <div className="container relative z-10 mt-2 mx-auto flex justify-between md:hidden items-center px-4">
                {/* دکمه‌ی منو */}


                {/* لوگو */}
                <Link href="/" className="w-16">
                    <Image src="/Group 946.svg" alt="Logo" width={80} height={80}/>
                </Link>

                {/* آیکون‌ها */}
                <div className="flex space-x-3 rtl:space-x-reverse">
                    <Link className="bg-slate-50 p-3 rounded-full w-12 h-12 flex items-center justify-center" href="/">
                        <Image src="/Sun.svg" alt="icon" width={24} height={24}/>
                    </Link>
                    <Link className="bg-slate-50 p-3 rounded-full w-12 h-12 flex items-center justify-center" href="/">
                        <Image src="/Search-01.svg" alt="Search Icon" width={24} height={24}/>
                    </Link>
                </div>
            </div>


        </header>
    );
}

export default Header;
