"use client"

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import {useDebounce} from "usehooks-ts";
import qs from "query-string";
import { ChangeEvent,useState,useEffect } from "react";

const SearchInput = () => {
    const router=useRouter();
    const [value,setValue]=useState("")
    const debouncedValue=useDebounce(value,500)
    const hangleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value)
    }
    useEffect(()=>{
        const url=qs.stringifyUrl({
            url:"/",
            query:{
                search:debouncedValue
            }
        },{skipEmptyString:true,skipNull:true})
        router.push(url)
    },[debouncedValue,router])
    return ( 
        <div className=" flex w-full relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input onChange={hangleChange}
            value={value} placeholder="search board" className="w-full max-w-[516px] pl-9"/>
        </div>
     );
}
 
export default SearchInput;