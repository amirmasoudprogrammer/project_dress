import React from 'react';

function SelectedColorDetailProduct({handleColorClick,product_colors,handleSuggestedColorClick,selectedColor,suggestedColor}) {
    return (
       <>

           <div className="flex flex-col mt-4 pb-2 border-b border-[#626262]">
               <span className="text-black">رنگ: {selectedColor}</span>
               <div className="flex mt-2">
                   {product_colors.map((color) => (
                       <button
                           key={color.id}
                           style={{backgroundColor: color.hex_code}}
                           className="w-[20px] h-[20px] mr-2 border border-gray-300 rounded-full flex items-center justify-center"
                           onClick={() => handleColorClick(color.name)}
                       >
                           {selectedColor === color.name && (
                               <span className="text-white font-bold text-sm">✓</span>
                           )}
                       </button>
                   ))}
               </div>
           </div>


           <div className="flex flex-col mt-2">
               <span className="text-black">رنگ های پیشنهادی برای استایلیست</span>
               <div className="flex mt-5 items-end justify-end">
                   {product_colors.flatMap((colorObj) =>
                       colorObj.combinations.map((color) => (
                           <button
                               key={color.id}
                               className="w-[25px] h-[25px] mr-2 border border-gray-300 rounded-full"
                               style={{backgroundColor: color.hex_code}}
                               onClick={() => handleSuggestedColorClick(color.name)}
                           >
                               {suggestedColor === color.name && (
                                   <span
                                       className="text-white font-bold text-sm flex items-center justify-center">✓</span>
                               )}
                           </button>
                       ))
                   )}
               </div>
           </div>
       </>
    );
}

export default SelectedColorDetailProduct;