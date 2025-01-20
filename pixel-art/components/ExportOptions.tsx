"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ExportOptionsProps {
  pixelatedImage: string | null
  textOverlay: { text: string; x: number; y: number }
}

export function ExportOptions({ pixelatedImage, textOverlay }: ExportOptionsProps) {
  const [format, setFormat] = useState("png")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleExport = () => {
    if (!pixelatedImage) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      // Add text overlay
      if (textOverlay.text) {
        ctx.font = "20px Arial"
        ctx.fillStyle = "white"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 3
        ctx.strokeText(textOverlay.text, textOverlay.x, textOverlay.y)
        ctx.fillText(textOverlay.text, textOverlay.x, textOverlay.y)
      }

      const link = document.createElement("a")
      link.href = canvas.toDataURL(`image/${format}`)
      link.download = `pixel-art.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    img.src = pixelatedImage
  }

  return (
    <div className="mt-6 flex items-center gap-4">
      <Select value={format} onValueChange={setFormat}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="png">PNG</SelectItem>
          <SelectItem value="jpg">JPG</SelectItem>
          <SelectItem value="gif">GIF</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleExport} disabled={!pixelatedImage}>
        Export
      </Button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  )
}

