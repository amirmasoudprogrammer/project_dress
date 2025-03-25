import React from 'react';

function Title({name}) {
    return (
        <div className="flex items-center justify-center mt-36 mb-20">
            <span className="w-12 ml-1  h-[1px] bg-green-700 dark:bg-white"></span>
            <p className="text-2xl font-normal text-green-700 dark:text-white">{name}</p>
            <span className="w-12 mr-1 h-[1px] bg-green-700 dark:bg-white"></span>
        </div>
    );
}

export default Title;