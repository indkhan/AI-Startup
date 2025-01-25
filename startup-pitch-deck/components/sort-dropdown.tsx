"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type SortOption = "Most Liked" | "Newest"

interface SortDropdownProps {
  onSort: (option: SortOption) => void
}

export function SortDropdown({ onSort }: SortDropdownProps) {
  const [selected, setSelected] = useState<SortOption>("Most Liked")

  const handleSelect = (option: SortOption) => {
    setSelected(option)
    onSort(option)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[180px] justify-between text-white border-white hover:bg-purple-600">
          {selected}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuItem onClick={() => handleSelect("Most Liked")}>Most Liked</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect("Newest")}>Newest</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

