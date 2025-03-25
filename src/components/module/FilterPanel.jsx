import { motion, AnimatePresence } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const FilterPanel = ({ showFilters, toggleFilters, filterName, showCategoryItems, toggleCategoryItems }) => {
    return (
        <AnimatePresence>
            {showFilters && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bg-white shadow-lg z-20 border border-gray-300 w-auto h-screen flex flex-col items-start p-5 top-52 left-0 right-0 mx-auto rounded-2xl overflow-hidden"
                >
                    {/* 🔹 دکمه بستن کل فیلترها */}
                    <div className="flex items-center justify-between w-full relative">
                        <button
                            onClick={toggleFilters}
                            className="absolute left-3 text-gray-600 text-2xl font-bold hover:text-red-500 transition"
                        >
                            <IoIosClose />
                        </button>
                        <span className="text-black font-bold">مرتب سازی براساس</span>
                    </div>

                    {/* 🔹 گزینه‌های فیلتر */}
                    <div className="w-full flex flex-col gap-2 mt-5">
                        {filterName.map((filter, index) => (
                            <motion.div
                                key={filter.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between w-full p-3 text-black border-b border-gray-200 cursor-pointer hover:text-[#6E8E59] transition-all"
                                onClick={filter.id === 1 ? toggleCategoryItems : null}
                            >
                                <span className="text-sm font-medium">{filter.name}</span>
                                <FaAngleLeft />
                            </motion.div>
                        ))}

                        {/* 🔹 نمایش دسته‌بندی‌ها در یک پنل مستقل */}
                        <AnimatePresence>
                            {showCategoryItems && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    transition={{ duration: 0.3 }}
                                    className="fixed top-0 left-0 right-0 h-full bg-white z-30 shadow-lg rounded-lg flex flex-col p-5"
                                >
                                    {/* 🔸 دکمه بستن پنل دسته‌بندی‌ها */}
                                    <button
                                        onClick={toggleCategoryItems}
                                        className="text-black text-2xl font-bold absolute top-5 left-5 hover:text-red-500 transition"
                                    >
                                        <IoMdClose />
                                    </button>

                                    <h2 className="text-black font-bold text-lg mb-5 text-center">دسته‌بندی‌ها</h2>

                                    {/* 🔹 لیست دسته‌بندی‌ها */}
                                    <div className="flex flex-col gap-3">
                                        {["فرمالیته", "نامزدی", "عقد و عروسی", "لباس بله برون"].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="text-black text-lg p-3 border-b border-gray-300 cursor-pointer hover:text-[#6E8E59] transition"
                                            >
                                                {item}
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FilterPanel;
