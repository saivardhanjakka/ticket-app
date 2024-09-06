"use client"
import React from 'react'
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const dateFilters: { label: string; value?: string }[] = [
  { label: "All" },
  { label: "Today", value: "Today" },
  { label: "Yesterday", value: "Yesterday" }
];

const DateFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select 
      defaultValue={searchParams.get("dateFilter") || ""} 
      onValueChange={(dateFilter) => {
        const params = new URLSearchParams(searchParams.toString());

        if (dateFilter) {
          params.set("dateFilter", dateFilter);
        } else {
          params.delete("dateFilter");
        }

        const query = params.toString() ? `?${params.toString()}` : "";
        router.push(`/tickets${query}`);
      }}
    >
      <SelectTrigger className='w-[200px]'>
        <SelectValue placeholder="Filter by Date..." />
      </SelectTrigger>
      <SelectContent>
        {dateFilters.map((filter) => (
          <SelectItem key={filter.value || "All"} value={filter.value || "All"}>
            {filter.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default DateFilter;
