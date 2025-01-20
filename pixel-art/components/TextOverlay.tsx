"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TextOverlayProps {
  setTextOverlay: (textOverlay: { text: string; x: number; y: number }) => void
}

export function TextOverlay({ setTextOverlay }: TextOverlayProps) {
  const [text, setText] = useState("")
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const handleApplyText = () => {
    setTextOverlay({ text, x, y })
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3 text-indigo-900">Add Text Overlay</h2>
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            Text
          </label>
          <Input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
          />
        </div>
        <div>
          <label htmlFor="x" className="block text-sm font-medium text-gray-700 mb-1">
            X Position
          </label>
          <Input type="number" id="x" value={x} onChange={(e) => setX(Number(e.target.value))} placeholder="X" />
        </div>
        <div>
          <label htmlFor="y" className="block text-sm font-medium text-gray-700 mb-1">
            Y Position
          </label>
          <Input type="number" id="y" value={y} onChange={(e) => setY(Number(e.target.value))} placeholder="Y" />
        </div>
        <Button onClick={handleApplyText}>Apply Text</Button>
      </div>
    </div>
  )
}

