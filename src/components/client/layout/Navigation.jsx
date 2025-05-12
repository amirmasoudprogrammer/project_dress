import { useState } from "react";

import Link from "next/link";
import { TiPhoneOutline } from "react-icons/ti";

import { CiShoppingBasket } from "react-icons/ci";
import {AiOutlineHome, AiOutlineUser} from "react-icons/ai";
import { TbCategory } from "react-icons/tb";



const Navigation = () => {
    const [active, setActive] = useState(2);

    const menuItems = [

        { name: "تماس با ما", icon:<TiPhoneOutline />, color: "bg-gray-900" ,link:"/Contact" },
        { name: "سبد خرید", icon: <CiShoppingBasket />, color: "bg-gray-900" ,link: "/Shopping_Cart" },
        { name: "خانه", icon: <AiOutlineHome />, color: "bg-gray-900" , link: "/" },
        { name: "محصولات", icon: <TbCategory />, color: "bg-gray-900" , link: "/Products" },
        { name: "پروفایل", icon: <AiOutlineUser />, color: "bg-gray-900" ,link: "/Login_Registration"},
    ];

    const handleClick = (index) => {
        setActive(index);
    };

    return (
        <div className="md:hidden flex justify-center items-center pt-10 bg-gray-900">
            <div className="relative w-96 h-16 bg-[#6E8E59] flex justify-center items-center rounded-t-lg shadow-lg">
                <ul className="flex w-80">
                    {menuItems.map((item, index) => (
                      <Link href={item.link} key={index} className={`relative list-none w-16 h-16 flex flex-col items-center cursor-pointer transition-all duration-500 ${active === index ? "text-black active " : "text-gray-800 "}`} onClick={() => handleClick(index)}>
                         <span className={`block text-2xl text-white  transition-transform z-10 duration-500 ${
                      active === index ? "-translate-y-2 " : ""
                  }`}>
                {item.icon}
              </span>
                          <span className={`absolute text-white  text-xs opacity-0 z-10 transition-all duration-500 ${
                              active === index ? "opacity-100 translate-y-12 " : ""
                              }`}>
                           {item.name}
                           </span>
                      </Link>
                    ))}
                    <div className={`absolute top-[-20px] w-16 p-0 h-16 ${menuItems[active].color} border-4 border-black rounded-full  transition-transform duration-500`}
                        style={{ transform: `translateX(${active * -64}px)` }}
                    ></div>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
