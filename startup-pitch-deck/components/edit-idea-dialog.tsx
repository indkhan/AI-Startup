"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { StartupIdea } from "@/types/startup"

interface EditIdeaDialogProps {
  idea: StartupIdea | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (updatedIdea: StartupIdea) => void
}

export function EditIdeaDialog({ idea, open, onOpenChange, onSave }: EditIdeaDialogProps) {
  const [editedIdea, setEditedIdea] = useState<StartupIdea | null>(null)

  useEffect(() => {
    if (idea) {
      setEditedIdea(idea)
    }
  }, [idea])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedIdea((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleSave = () => {
    if (editedIdea) {
      onSave(editedIdea)
      onOpenChange(false)
    }
  }

  if (!editedIdea) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Idea</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" name="title" value={editedIdea.title} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mainIdea" className="text-right">
              Main Idea
            </Label>
            <Textarea
              id="mainIdea"
              name="mainIdea"
              value={editedIdea.mainIdea}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="market" className="text-right">
              Market
            </Label>
            <Input id="market" name="market" value={editedIdea.market} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="marketSize" className="text-right">
              Market Size
            </Label>
            <Input
              id="marketSize"
              name="marketSize"
              value={editedIdea.marketSize}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

