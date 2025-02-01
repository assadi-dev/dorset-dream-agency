"use client";
import React from "react";
import { useLottie } from "lottie-react";
import animation from "@lottieFiles/1733000485893.json";

const WorkInProgress = () => {
    const options = {
        animationData: animation,
        loop: true,
    };

    const { View } = useLottie({
        ...options,
        className: "h-[65vh]",
    });

    return (
        <div className=" bg-white rounded-xl shadow-lg w-fit py-5 px-10 mx-auto mt-10">
            <div className="text-center font-semibold text-2xl animate-bounce">En cours de développement</div>
            {View}
        </div>
    );
};

export default WorkInProgress;
