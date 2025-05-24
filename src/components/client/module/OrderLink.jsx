import Link from "next/link";

const OrderLink = ({href, icon, text, animation}) => (
    <Link
        href={href}
        className="text-[#3083FF] text-[30px] flex flex-col items-center group transition-all duration-300"
    >
        <span className={`${animation} transition-all`}>{icon}</span>
        <p className="text-[14px] mt-2">{text}</p>
    </Link>
);
export default OrderLink