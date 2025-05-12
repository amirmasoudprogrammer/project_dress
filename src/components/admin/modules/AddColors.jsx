
import { useState } from "react";

function AddColors({ colors, setColors }) {
    const [isOpen, setIsOpen] = useState(false);

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
                            <div key={i} className="border rounded-lg p-4 bg-gray-50 space-y-4">
                                <h3 className="text-xl font-semibold mb-2">رنگ {i + 1}</h3>
                                <input
                                    type="text"
                                    placeholder="نام رنگ"
                                    value={color.name}
                                    onChange={(e) => handleColorChange(i, "name", e.target.value)}
                                    className="border p-2 rounded-md w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="کد رنگ"
                                    value={color.hex_code}
                                    onChange={(e) => handleColorChange(i, "hex_code", e.target.value)}
                                    className="border p-2 rounded-md w-full"
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
                                    <div key={j} className="border rounded-md p-3 bg-white shadow-sm mt-4">
                                        <input
                                            type="text"
                                            placeholder="نام رنگ پیشنهادی"
                                            value={comb.name}
                                            onChange={(e) => handleCombinationChange(i, j, "name", e.target.value)}
                                            className="border p-2 rounded-md w-full"
                                        />
                                        <input
                                            type="text"
                                            placeholder="کد رنگ پیشنهادی"
                                            value={comb.hex_code}
                                            onChange={(e) => handleCombinationChange(i, j, "hex_code", e.target.value)}
                                            className="border p-2 rounded-md w-full"
                                        />
                                        <input
                                            type="text"
                                            placeholder="توضیح"
                                            value={comb.description}
                                            onChange={(e) => handleCombinationChange(i, j, "description", e.target.value)}
                                            className="border p-2 rounded-md w-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div className="flex justify-between gap-4">
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
        </>
    );
}

export default AddColors;
