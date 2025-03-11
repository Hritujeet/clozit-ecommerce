import Link from 'next/link'
import {Button} from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className={"p-10 h-[80vh] bg-neutral-100 flex flex-col items-center gap-2 justify-center"}>
            <h1 className="text-[10rem] border-b border-neutral-400 py-5 font-bold">404</h1>
            <h4 className="text-2xl py-5 font-semibold text-neutral-600">Page Not Found</h4>
            <Link href={"/"}><Button className={"cursor-pointer"} size={"lg"}>Go to Home</Button></Link>
        </div>  
    )
}