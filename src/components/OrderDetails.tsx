"use client"
import React, {useState} from 'react';

const OrderDetails = () => {
    const [paymentMode, setPaymentMode] = useState<string | null>(null)
    const [address, setAddress] = useState<string>("")
    return (
        <div className="form w-full md:w-[60%]">
            <h1 className="text-3xl font-semibold text-center pb-10">Order Details</h1>
            <div className="grid grid-cols-1 gap-4">
                <div onClick={() => {
                    setPaymentMode("Cash On Delivery")
                }}
                     className={`card flex flex-col justify-center items-center px-8 py-4 border rounded-md duration-150 cursor-default gap-2 ${paymentMode == "Cash On Delivery" ? "bg-neutral-100" : "text-neutral-800 hover:bg-neutral-50"}`}>
                   <span className="text-lg flex gap-2 justify-center items-center">
                       Cash On Delivery
                   </span>
                </div>
                <div onClick={() => {
                    setPaymentMode("Card")
                }}
                     className={`card flex flex-col justify-center items-center px-8 py-4 border rounded-md duration-150 cursor-default gap-2 ${paymentMode == "Card" ? "bg-neutral-100" : "text-neutral-800 hover:bg-neutral-50"}`}>
                   <span className="text-lg flex gap-2 justify-center items-center">
                       Credit / Debit Card
                   </span>
                </div>
                <div onClick={() => {
                    setPaymentMode("Net Banking")
                }}
                     className={`card flex flex-col justify-center items-center px-8 py-4 border rounded-md duration-150 cursor-default gap-2 ${paymentMode == "Net Banking" ? "bg-neutral-100" : "text-neutral-800 hover:bg-neutral-50"}`}>
                   <span className="text-lg flex gap-2 justify-center items-center">
                       Net Banking
                   </span>
                </div>
                <div className="input py-4">
                    <textarea value={address} onChange={(e)=>{
                        setAddress(e.target.value)
                    }} name="address" id="address" className={"w-full rounded-md border border-neutral-300 p-5"}
                              placeholder={"Shipping Address"} rows={5}></textarea>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;