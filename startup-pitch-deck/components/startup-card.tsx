"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Heart, MessageCircle, Users, DollarSign, Lightbulb, Trash, Edit } from "lucide-react"
import type { StartupIdea } from "@/types/startup"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CommentDialog } from "./comment-dialog"
import { Button } from "@/components/ui/button"

interface StartupCardProps {
  startup: StartupIdea
  isOwner?: boolean
  onEdit?: (idea: StartupIdea) => void
  onDelete?: (id: string) => void
}

export function StartupCard({ startup, isOwner, onEdit, onDelete }: StartupCardProps) {
  const [likes, setLikes] = useState(startup.likes)
  const [comments, setComments] = useState(startup.comments)
  const [showComments, setShowComments] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full bg-white border-gray-200 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-gray-900">{startup.title}</CardTitle>
          {isOwner && (
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => onEdit && onEdit(startup)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete && onDelete(startup.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-600">
              <Lightbulb className="h-5 w-5" />
              <h3 className="font-medium">Main Startup Idea</h3>
            </div>
            <p className="text-sm text-gray-600">{startup.mainIdea}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600">
              <Users className="h-5 w-5" />
              <h3 className="font-medium">Market</h3>
            </div>
            <p className="text-sm text-gray-600">{startup.market}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-yellow-600">
              <DollarSign className="h-5 w-5" />
              <h3 className="font-medium">Market Size</h3>
            </div>
            <p className="text-sm text-gray-600">{startup.marketSize}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-purple-600">
              <ArrowRight className="h-5 w-5" />
              <h3 className="font-medium">Internet Audiences</h3>
            </div>
            <ul className="text-sm space-y-1 text-gray-600">
              {startup.internetAudiences.map((audience, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                  {audience}
                </motion.li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-200 mt-auto">
          <Button
            variant="ghost"
            size="sm"
            className="text-black hover:text-pink-700"
            onClick={() => setLikes((l) => l + 1)}
          >
            <Heart className="h-5 w-5 mr-2" />
            <span>{likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-black hover:text-blue-700"
            onClick={() => setShowComments(true)}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            <span>{comments}</span>
          </Button>
        </CardFooter>
      </Card>
      <CommentDialog
        open={showComments}
        onOpenChange={setShowComments}
        ideaId={startup.id}
        onComment={() => setComments((c) => c + 1)}
      />
    </motion.div>
  )
}

