"use client"
import React from 'react'
import {useRouter,useSearchParams} from "next/navigation"
import { Select ,SelectContent,SelectGroup,SelectItem,SelectTrigger,SelectValue} 

from '@/components/ui/select';

const statuses :{label :string ; value ?:string}[]=[
    {label :"Open/Started"},
    {label:"Open", value:"OPEN"},
    {label : "Started", value:"STARTED"},
    {label : "Closed", value:"CLOSED"},
];

const StatusFilter = () => {
    const router =useRouter()
    const searchParams =useSearchParams();

    
  return (
    <Select defaultValue={searchParams.get("status")||""}
   onValueChange={(status)=>{
    const params = new URLSearchParams();
   
    if(status) params.append("status",status);

    const query = params.size ? `?${params.toString()}` : "0";
    router.push(`/tickets${query}`);
    

   }} >
    <SelectTrigger>
        <SelectValue placeholder="Filter by Status..."/>
    </SelectTrigger>
    <SelectContent>
        {statuses.map((status)=>(
            <SelectItem key={status.value || "0"} 
             value={status.value || "0"}  >
                {status.label}
            </SelectItem>
        ))}
    </SelectContent>

   </Select>

  )
}

export default StatusFilter