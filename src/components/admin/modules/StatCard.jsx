import React from 'react';

function StatCard({icon,bg,label,color}) {
    return (
        <div className="flex items-center justify-center p-1 w-[200px] h-[70px] shadow-xl cursor-pointer border border-slate-200 rounded transition-all duration-500 hover:shadow-sm">
            <div className={`p-1 flex ${color} text-[20px] ${bg} rounded-full items-center justify-center w-[30px] h-[30px]`}>
                {icon}
            </div>
            <span className="text-[12px] mr-2 text-slate-500">{label}</span>
        </div>
    );
}

export default StatCard;