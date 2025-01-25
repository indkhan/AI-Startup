"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { StartupCard } from "@/components/startup-card"
import { SortDropdown } from "@/components/sort-dropdown"
import { startupIdeas } from "@/data/startups"
import { Plus, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type SortOption = "Most Liked" | "Newest"

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("Most Liked")
  const [sortedIdeas, setSortedIdeas] = useState(startupIdeas)

  useEffect(() => {
    const filteredIdeas = startupIdeas.filter(
      (startup) =>
        startup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        startup.mainIdea.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const sorted = [...filteredIdeas].sort((a, b) => {
      if (sortOption === "Most Liked") {
        return b.likes - a.likes
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    setSortedIdeas(sorted)
  }, [searchQuery, sortOption])

  const handleSort = (option: SortOption) => {
    setSortOption(option)
  }

  return (
    <div className="min-h-screen bg-purple-700">
      <header className="bg-purple-800 border-b border-purple-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white">
            StartupIdeas
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/new">
              <Button variant="secondary">
                <Plus className="h-4 w-4 mr-2" />
                Add Idea
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="text-white border-white hover:bg-purple-700">
                Login
              </Button>
            </Link>
            <Link href="/profile">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 space-y-12">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Startup Ideas</h1>
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={setSearchQuery} />
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <SortDropdown onSort={handleSort} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedIdeas.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      </main>
    </div>
  )
}

