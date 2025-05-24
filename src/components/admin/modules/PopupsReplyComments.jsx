import React from 'react';
import { IoMdClose } from "react-icons/io";

function PopupsReplyComments({ setReplyPopup, replyPopup }) {

    const onClose = () => {
        setReplyPopup({ show: false, item: null });
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex items-center justify-center px-2 sm:px-4">

            <div className="relative h-[200px] md:h-auto bg-white w-full md:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-xl p-4 sm:p-6 overflow-y-auto md:max-h-[85vh] animate-fadeIn flex flex-col">


                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 text-gray-500 hover:text-red-500 transition"
                    aria-label="بستن"
                >
                    <IoMdClose size={26} />
                </button>


                <div className="w-full flex justify-start mt-12 sm:mt-10 px-2">
                    <div className="bg-gray-200 text-gray-800 px-4 py-3 rounded-tr-2xl rounded-bl-2xl rounded-tl-md shadow-sm md:max-w-[85%] text-sm sm:text-base leading-6">
                        <p>{replyPopup.item.comment}</p>
                    </div>
                </div>


                {replyPopup.item.replies?.map((item, index) => (
                    <div key={index} className="w-full flex justify-end mt-3 px-2">
                        <div className="bg-blue-500 text-white px-4 py-3 rounded-tl-2xl rounded-br-2xl rounded-tr-md shadow-md max-w-[85%] text-sm sm:text-base leading-6">
                            <p>{item.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PopupsReplyComments;
