"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

async function refineWithAI(title: string, description: string) {
  const response = await fetch("/api/refine", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  })
  if (!response.ok) throw new Error("Failed to refine idea")
  return response.json()
}

export default function NewIdeaPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [market, setMarket] = useState("")
  const [marketSize, setMarketSize] = useState("")
  const [internetAudiences, setInternetAudiences] = useState("")
  const [isRefining, setIsRefining] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRefineByAI = async () => {
    setIsRefining(true)
    try {
      const refinedIdea = await refineWithAI(title, description)
      setTitle(refinedIdea.title)
      setDescription(refinedIdea.description)
      setMarket(refinedIdea.market)
      setMarketSize(refinedIdea.marketSize)
      setInternetAudiences(refinedIdea.internetAudiences.join(", "))
      toast({
        title: "Idea Refined",
        description: "Your idea has been refined by AI.",
      })
    } catch (error) {
      toast({
        title: "Refinement Failed",
        description: "Failed to refine the idea. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefining(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          market,
          marketSize,
          internetAudiences: internetAudiences.split(",").map((a) => a.trim()),
        }),
      })
      if (!response.ok) throw new Error("Failed to submit idea")
      toast({
        title: "Idea Submitted",
        description: "Your idea has been successfully submitted.",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit the idea. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-purple-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Add New Idea</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your idea title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your startup idea"
              className="h-32"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="market">Market</Label>
            <Input
              id="market"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              placeholder="Define your target market"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="marketSize">Market Size</Label>
            <Input
              id="marketSize"
              value={marketSize}
              onChange={(e) => setMarketSize(e.target.value)}
              placeholder="Estimate the market size"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="internetAudiences">Internet Audiences</Label>
            <Input
              id="internetAudiences"
              value={internetAudiences}
              onChange={(e) => setInternetAudiences(e.target.value)}
              placeholder="List internet audiences (comma-separated)"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleRefineByAI} disabled={isRefining || isSubmitting}>
            {isRefining ? "Refining..." : "Refine by AI"}
          </Button>
          <Button onClick={handleSubmit} disabled={isRefining || isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Idea"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

