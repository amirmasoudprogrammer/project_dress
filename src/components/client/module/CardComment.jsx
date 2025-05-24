import React, {useState} from 'react';
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import PopupsReplyComments from "@/components/admin/modules/PopupsReplyComments";

function CardComment({ data }) {
    const { comment, user } = data;

    const [replyPopup , setReplyPopup] = useState({show:false , item:null })

    const startReply = (data) =>{
        setReplyPopup({show:true, item:data})
    }


    return (
        <>
        <div onClick={() => startReply(data)} className="cursor-pointer w-full max-w-[260px] md:max-w-[320px] bg-gradient-to-b from-white to-gray-50 border border-gray-200 shadow-xl p-6 md:p-8 rounded-2xl flex flex-col gap-4 transition-transform duration-300 hover:scale-105">
            <div className="flex items-center gap-4 border-b border-gray-300 pb-4">
                <Image
                    className="rounded-full shadow-md w-[64px] h-[64px] md:w-[80px] md:h-[80px]"
                    src="/image/users.png"
                    width={80}
                    height={80}
                    alt="user avatar"
                />
                <div>
                    <span className="text-gray-800 text-sm md:text-base font-semibold block">{user.name || "کاربر"}</span>
                    <div className="text-yellow-400 mt-1 flex items-center space-x-1 rtl:space-x-reverse text-sm">
                        {[...Array(3)].map((_, i) => (
                            <FaStar key={i} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-2 text-gray-700 text-sm md:text-base italic text-center leading-relaxed">
                “{comment}”
            </div>
        </div>


            {replyPopup.show && (
                <PopupsReplyComments replyPopup={replyPopup} setReplyPopup={setReplyPopup}/>
            )}
        </>
    );
}

export default CardComment;

