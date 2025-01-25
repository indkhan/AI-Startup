"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl w-full mx-auto">
      <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
      <Input
        placeholder="Search startup ideas..."
        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}

