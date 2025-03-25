import { useState } from "react";
import {
    AiOutlineHome,
    AiOutlineUser,
    AiOutlineMessage,
    AiOutlineCamera,
    AiOutlineSetting,
} from "react-icons/ai";
import Link from "next/link";


const Navigation = () => {
    const [active, setActive] = useState(0);

    const menuItems = [
        { name: "Home", icon: <AiOutlineHome />, color: "bg-gray-900" },
        { name: "Message", icon: <AiOutlineMessage />, color: "bg-gray-900" },
        { name: "Photos", icon: <AiOutlineCamera />, color: "bg-gray-900" },
        { name: "Settings", icon: <AiOutlineSetting />, color: "bg-gray-900" },
        { name: "Profile", icon: <AiOutlineUser />, color: "bg-gray-900" },
    ];

    const handleClick = (index) => {
        setActive(index);
    };

    return (
        <div className="md:hidden flex justify-center items-center pt-10 bg-gray-900">
            <div className="relative w-96 h-16 bg-[#6E8E59] flex justify-center items-center rounded-t-lg shadow-lg">
                <ul className="flex w-80">
                    {menuItems.map((item, index) => (

                      <li
                          key={index}
                          className={`relative list-none w-16 h-16 flex flex-col items-center cursor-pointer transition-all duration-500 ${
                              active === index ? "text-black active" : "text-gray-800"
                          }`}
                          onClick={() => handleClick(index)}
                      >
              <span
                  className={`block text-2xl text-white transition-transform z-10 duration-500 ${
                      active === index ? "-translate-y-2" : ""
                  }`}
              >
                {item.icon}
              </span>
                          <span
                              className={`absolute text-white  text-xs opacity-0 z-10 transition-all duration-500 ${
                                  active === index ? "opacity-100 translate-y-12" : ""
                              }`}
                          >
                {item.name}
              </span>
                      </li>

                    ))}
                    <div
                        className={`absolute top-[-20px] w-16 h-16 ${menuItems[active].color} border-4 border-black  transition-transform duration-500`}
                        style={{ transform: `translateX(${active * -64}px)` }}
                    ></div>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;
