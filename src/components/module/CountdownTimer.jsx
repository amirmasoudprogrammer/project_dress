import React, {useState, useEffect} from "react";

const CountdownTimer = ({time ,setTime}) => {


    useEffect(() => {
        if (time <= 0) return;

        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="flex text-3xl items-center justify-center">
            <h1 className="text-black">  {formatTime(time)}</h1>
        </div>
    );
};

export default CountdownTimer;
