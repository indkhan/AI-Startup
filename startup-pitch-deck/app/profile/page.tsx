"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StartupCard } from "@/components/startup-card"
import { startupIdeas } from "@/data/startups"
import { EditIdeaDialog } from "@/components/edit-idea-dialog"
import type { StartupIdea } from "@/types/startup"

export default function ProfilePage() {
  const [userIdeas, setUserIdeas] = useState(startupIdeas.slice(0, 2)) // Simulating user's ideas
  const [likedIdeas] = useState(startupIdeas.slice(2, 4)) // Simulating liked ideas
  const [commentedIdeas] = useState(startupIdeas.slice(4, 6)) // Simulating commented ideas
  const [editingIdea, setEditingIdea] = useState<StartupIdea | null>(null)

  const handleEdit = (idea: StartupIdea) => {
    setEditingIdea(idea)
  }

  const handleDelete = (id: string) => {
    setUserIdeas(userIdeas.filter((idea) => idea.id !== id))
  }

  const handleSaveEdit = (updatedIdea: StartupIdea) => {
    setUserIdeas((prevIdeas) => prevIdeas.map((idea) => (idea.id === updatedIdea.id ? updatedIdea : idea)))
    setEditingIdea(null)
  }

  return (
    <div className="min-h-screen bg-purple-700 p-4">
      <div className="container mx-auto bg-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        <Tabs defaultValue="myIdeas">
          <TabsList>
            <TabsTrigger value="myIdeas">My Ideas</TabsTrigger>
            <TabsTrigger value="liked">Liked Ideas</TabsTrigger>
            <TabsTrigger value="commented">Commented Ideas</TabsTrigger>
          </TabsList>
          <TabsContent value="myIdeas">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {userIdeas.map((idea) => (
                <StartupCard
                  key={idea.id}
                  startup={idea}
                  isOwner={true}
                  onEdit={() => handleEdit(idea)}
                  onDelete={() => handleDelete(idea.id)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="liked">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {likedIdeas.map((idea) => (
                <StartupCard key={idea.id} startup={idea} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="commented">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {commentedIdeas.map((idea) => (
                <StartupCard key={idea.id} startup={idea} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <EditIdeaDialog
          idea={editingIdea}
          open={!!editingIdea}
          onOpenChange={(open) => !open && setEditingIdea(null)}
          onSave={handleSaveEdit}
        />
      </div>
    </div>
  )
}

