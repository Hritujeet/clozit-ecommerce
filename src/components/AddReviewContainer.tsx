import React from 'react';
import {Button} from "@/components/ui/button";

const AddReviewContainer = () => {
    return (
        <div className={"w-[80vw] mx-auto flex flex-col gap-4"}>
            <h1 className="my-4 text-3xl md:text-4xl font-bold text-center">Post Review</h1>
            <form className={"md:w-[90%] w-full mx-auto space-y-2"}>
                <input className={"outline-none border w-full px-4 py-2 rounded-md"} type="text" placeholder={"Title"}/>
                <textarea className={"border rounded-md w-full h-32 px-4 py-2"} placeholder={"What's your experience?"}></textarea>
                <Button className={"w-full"}>Post Review</Button>
            </form>
        </div>
    );
};

export default AddReviewContainer;