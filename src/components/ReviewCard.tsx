import React from 'react';
import Image from "next/image";

const ReviewCard = () => {
    return (
        <div className="py-4 px-6 border border-gray-100 max-xl:max-w-2xl max-xl:mx-auto border-neutral-300 rounded-xl my-2">
            <h3 className="font-manrope font-semibold text-xl sm:text-2xl leading-9 text-black mb-6">Outstanding
                Experience!!!
            </h3>
            <p className="font-normal text-neutral-600">One of the
                standout
                features of Pagedone is its intuitive and user-friendly interface. Navigating through the
                system feels natural, and the layout makes it easy to locate and utilize various design
                elements. This is particularly beneficial for designers looking to streamline their
                workflow.</p>
            <div className="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 my-2">
                <div className="flex items-center gap-3">
                    <Image width={100} height={100} src="https://pagedone.io/asset/uploads/1704349572.png"
                           alt="John image"
                           className="w-8 h-8 rounded-full object-cover"/>
                    <h6 className="font-semibold text-lg leading-8 text-indigo-600 ">John Watson</h6>
                </div>
                <p className="font-normal text-lg leading-8 text-gray-400">Nov 01, 2023</p>
            </div>
        </div>
    );
};

export default ReviewCard;