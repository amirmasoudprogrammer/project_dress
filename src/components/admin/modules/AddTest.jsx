"use client";

import { useState } from "react";
import { motion } from "framer-motion";

function AddColors({ colors, setColors }) {
    const [isOpen, setIsOpen] = useState(false);
    const [colorPickerTarget, setColorPickerTarget] = useState(null);

    const availableColors = [
        { name: "قرمز", hex_code: "#FF0000" },
        { name: "سبز", hex_code: "#00FF00" },
        { name: "آبی", hex_code: "#0000FF" },
        { name: "زرد", hex_code: "#FFFF00" },
        { name: "مشکی", hex_code: "#000000" },
        { name: "سفید", hex_code: "#FFFFFF" },
        { name: "نارنجی", hex_code: "#FFA500" },
        { name: "بنفش", hex_code: "#800080" },
        { name: "صورتی", hex_code: "#FFC0CB" },
        { name: "قهوه‌ای", hex_code: "#8B4513" },
        { name: "آبی آسمانی", hex_code: "#87CEEB" },
        { name: "فیروزه‌ای", hex_code: "#40E0D0" },
        { name: "لیمویی", hex_code: "#FFF700" },
        { name: "خاکستری", hex_code: "#808080" },
        { name: "آبی نفتی", hex_code: "#000080" },
        { name: "سبز زیتونی", hex_code: "#808000" },
        { name: "زرد طلایی", hex_code: "#FFD700" },
        { name: "آبی فیروزه‌ای", hex_code: "#00CED1" },
        { name: "ارغوانی", hex_code: "#C71585" },
        { name: "لاجوردی", hex_code: "#1E90FF" },
        { name: "زرشکی", hex_code: "#800000" },
        { name: "یشمی", hex_code: "#00A86B" },
        { name: "آبی کاربنی", hex_code: "#003366" },
        { name: "نیلی", hex_code: "#4B0082" },
        { name: "سبز چمنی", hex_code: "#7CFC00" },
        { name: "زیتونی روشن", hex_code: "#9ACD32" },
        { name: "کرم", hex_code: "#FFFDD0" },
        { name: "خاکی", hex_code: "#F0E68C" },
        { name: "برنزی", hex_code: "#CD7F32" },
        { name: "نقره‌ای", hex_code: "#C0C0C0" },
        { name: "طلایی", hex_code: "#FFD700" },
        { name: "آبی آکوامارین", hex_code: "#7FFFD4" },
        { name: "سبز دریایی", hex_code: "#2E8B57" },
        { name: "قرمز شرابی", hex_code: "#B22222" },
        { name: "خاکستری روشن", hex_code: "#D3D3D3" }
    ];

    const handleColorChange = (idx, field, value) => {
        const newColors = [...colors];
        newColors[idx][field] = value;
        setColors(newColors);
    };

    const handleCombinationChange = (colorIdx, combIdx, field, value) => {
        const newColors = [...colors];
        newColors[colorIdx].combinations[combIdx][field] = value;
        setColors(newColors);
    };

    const addColor = () => {
        setColors([
            ...colors,
            { name: "", hex_code: "", stock: "", combinations: [{ name: "", hex_code: "", description: "" }] }
        ]);
    };

    const addCombination = (colorIdx) => {
        const newColors = [...colors];
        newColors[colorIdx].combinations.push({ name: "", hex_code: "", description: "" });
        setColors(newColors);
    };

    const handleColorSelect = (selectedColor) => {
        if (colorPickerTarget) {
            const { type, colorIdx, combIdx } = colorPickerTarget;
            const newColors = [...colors];
            if (type === "main") {
                newColors[colorIdx].name = selectedColor.name;
                newColors[colorIdx].hex_code = selectedColor.hex_code;
            } else if (type === "combination") {
                newColors[colorIdx].combinations[combIdx].name = selectedColor.name;
                newColors[colorIdx].combinations[combIdx].hex_code = selectedColor.hex_code;
            }
            setColors(newColors);
            setColorPickerTarget(null);
        }
    };

    return (
        <>
            <div className="flex justify-start mt-8">
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg"
                >
                    افزودن رنگ جدید
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-2xl relative space-y-6 overflow-y-auto max-h-[90vh]">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 left-3 text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-bold text-center mb-4">افزودن رنگ‌ها</h2>

                        {colors.map((color, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="border rounded-lg p-4 bg-gray-50 space-y-4"
                            >
                                <h3 className="text-xl font-semibold mb-2">رنگ {i + 1}</h3>

                                <input
                                    type="text"
                                    placeholder="نام رنگ"
                                    value={color.name}
                                    readOnly
                                    onClick={() => setColorPickerTarget({ type: "main", colorIdx: i })}
                                    className="border p-2 rounded-md w-full cursor-pointer bg-gray-100"
                                />

                                <input
                                    type="text"
                                    placeholder="کد رنگ"
                                    value={color.hex_code}
                                    readOnly
                                    className="border p-2 rounded-md w-full bg-gray-100"
                                />

                                <input
                                    type="number"
                                    placeholder="موجودی"
                                    value={color.stock}
                                    onChange={(e) => handleColorChange(i, "stock", e.target.value)}
                                    className="border p-2 rounded-md w-full"
                                />

                                <button
                                    type="button"
                                    onClick={() => addCombination(i)}
                                    className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                                >
                                    افزودن رنگ پیشنهادی
                                </button>

                                {color.combinations.map((comb, j) => (
                                    <motion.div
                                        key={j}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: j * 0.05 }}
                                        className="border rounded-md p-3 bg-white shadow-sm mt-4"
                                    >
                                        <input
                                            type="text"
                                            placeholder="نام رنگ پیشنهادی"
                                            value={comb.name}
                                            readOnly
                                            onClick={() => setColorPickerTarget({ type: "combination", colorIdx: i, combIdx: j })}
                                            className="border p-2 rounded-md w-full cursor-pointer bg-gray-100"
                                        />
                                        <input
                                            type="text"
                                            placeholder="کد رنگ پیشنهادی"
                                            value={comb.hex_code}
                                            readOnly
                                            className="border p-2 rounded-md w-full bg-gray-100 mt-2"
                                        />
                                        <input
                                            type="text"
                                            placeholder="توضیح"
                                            value={comb.description}
                                            onChange={(e) => handleCombinationChange(i, j, "description", e.target.value)}
                                            className="border p-2 rounded-md w-full mt-2"
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ))}

                        <div className="flex justify-between gap-4 mt-4">
                            <button
                                type="button"
                                onClick={addColor}
                                className="flex-1 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                            >
                                افزودن رنگ جدید
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="flex-1 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                            >
                                ثبت رنگ‌ها
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {colorPickerTarget && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md space-y-4 relative">
                        <button
                            onClick={() => setColorPickerTarget(null)}
                            className="absolute top-3 left-3 text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            &times;
                        </button>
                        <h3 className="text-xl font-bold text-center">انتخاب رنگ</h3>

                        <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-2">
                            {availableColors.map((color, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.03 }}
                                    className="flex items-center gap-2 p-2 border hover:bg-gray-100 rounded cursor-pointer"
                                    onClick={() => handleColorSelect(color)}
                                >
                                    <div
                                        className="w-6 h-6 rounded-full"
                                        style={{ backgroundColor: color.hex_code }}
                                    ></div>
                                    <span>{color.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddColors;
