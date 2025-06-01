import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";


function AddColors({colors, setColors}) {

    const [isOpen, setIsOpen] = useState(false);
    const [colorPickerTarget, setColorPickerTarget] = useState(null);
    const [color, setColor] = useState(null);
    const fetchData = async () => {
        try {
            const token = Cookies.get('tokenAdmin');
            const res = await axios.get('https://joppin.ir/api/v1/admin/colors', {
                headers: token ? {Authorization: `Bearer ${token}`} : {}
            });
            setColor(res.data.data);
        } catch (error) {
            console.error("خطا در دریافت محصولات:", error);
        }
    };
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);
    const addColor = () => {
        setColors([
            ...colors,
            {name: "", hex_code: "", stock: "", combinations: [{name: "", hex_code: "", description: ""}]}
        ]);
    };
    const handleColorSelect = (selectedColor) => {
        const {type, colorIdx, combIdx} = colorPickerTarget;


        const {hex_code, display_name, name, id} = selectedColor
        const updatedColors = [...colors]
        console.log(updatedColors)
        if (type === "main") {
            updatedColors[colorIdx].name = name
            updatedColors[colorIdx].hex_code = hex_code;
            updatedColors[colorIdx].display_name = display_name;


        }else if (type === "combination") {
            updatedColors[colorIdx].combinations[combIdx].name = name;
            updatedColors[colorIdx].combinations[combIdx].hex_code = hex_code;
            updatedColors[colorIdx].display_name = display_name;
        }
        setColors(updatedColors);
        setColorPickerTarget(null);
    }
    const handleColorChange = (index, field, value) =>{
        const updatedColors = [...colors];
        updatedColors[index][field] = value;
        setColors(updatedColors);
    }
    const handleCombinationChange = (colorIdx, combIdx, field, value) => {
        const updatedColors = [...colors];
        updatedColors[colorIdx].combinations[combIdx][field] = value;
        setColors(updatedColors);
    };
    const addCombination = (colorIdx) => {
        const updatedColors = [...colors];
        updatedColors[colorIdx].combinations.push({name: "", hex_code: "", description: ""});
        setColors(updatedColors);
    };

    console.log(colors)






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
                    <div
                        className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-2xl relative space-y-6 overflow-y-auto max-h-[90vh]">
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
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.4, delay: i * 0.1}}
                                className="border rounded-lg p-4 bg-gray-50 space-y-4"
                            >
                                <h3 className="text-xl font-semibold mb-2">رنگ {i + 1}</h3>

                                <div onClick={() => setColorPickerTarget({type: "main", colorIdx: i})}
                                     className="cursor-pointer">
                                    <input
                                        type="text"
                                        placeholder="نام رنگ"
                                        value={color.name}
                                        readOnly
                                        className="border p-2 rounded-md w-full cursor-pointer bg-gray-100"
                                    />
                                    <input
                                        type="text"
                                        placeholder="کد رنگ"
                                        value={color.hex_code}
                                        readOnly
                                        className="border p-2 rounded-md w-full bg-gray-100 mt-2"
                                    />
                                </div>


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
                                        initial={{opacity: 0, y: 10}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.4, delay: j * 0.05}}
                                        className="border rounded-md p-3 bg-white shadow-sm mt-4"
                                    >
                                        <div onClick={() => setColorPickerTarget({
                                            type: "combination",
                                            colorIdx: i,
                                            combIdx: j
                                        })} className="cursor-pointer">
                                            <input
                                                type="text"
                                                placeholder="نام رنگ پیشنهادی"
                                                value={comb.name}
                                                readOnly
                                                className="border p-2 rounded-md w-full cursor-pointer bg-gray-100"
                                            />
                                            <input
                                                type="text"
                                                placeholder="کد رنگ پیشنهادی"
                                                value={comb.hex_code}
                                                readOnly
                                                className="border p-2 rounded-md w-full bg-gray-100 mt-2"
                                            />
                                        </div>
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
                            {color.map((color, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.3, delay: index * 0.03}}
                                    className="flex items-center gap-2 p-2 border hover:bg-gray-100 rounded cursor-pointer"
                                    onClick={() => handleColorSelect(color)}
                                >
                                    <div
                                        className="w-6 h-6 rounded-full"
                                        style={{backgroundColor: color.hex_code}}
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
