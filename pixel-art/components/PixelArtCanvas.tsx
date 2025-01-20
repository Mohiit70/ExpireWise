"use client"

import { useEffect, useRef } from "react"

interface PixelArtCanvasProps {
  originalImage: string
  setPixelatedImage: (image: string) => void
  setPalette: (palette: string[]) => void
  textOverlay: { text: string; x: number; y: number }
}

export function PixelArtCanvas({ originalImage, setPixelatedImage, setPalette, textOverlay }: PixelArtCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.onload = () => {
      const maxWidth = 800
      const maxHeight = 600
      let width = img.width
      let height = img.height

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width *= ratio
        height *= ratio
      }

      const pixelSize = Math.max(1, Math.floor(Math.min(width, height) / 100))
      canvas.width = Math.floor(width / pixelSize) * pixelSize
      canvas.height = Math.floor(height / pixelSize) * pixelSize

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      const colorMap = new Map<string, number>()

      for (let y = 0; y < canvas.height; y += pixelSize) {
        for (let x = 0; x < canvas.width; x += pixelSize) {
          const i = (y * canvas.width + x) * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          const color = `rgb(${r},${g},${b})`
          colorMap.set(color, (colorMap.get(color) || 0) + 1)

          ctx.fillStyle = color
          ctx.fillRect(x, y, pixelSize, pixelSize)
        }
      }

      const sortedColors = [...colorMap.entries()].sort((a, b) => b[1] - a[1])
      const palette = sortedColors.slice(0, 10).map(([color]) => color)
      setPalette(palette)

      // Add text overlay
      if (textOverlay.text) {
        ctx.font = "20px Arial"
        ctx.fillStyle = "white"
        ctx.strokeStyle = "black"
        ctx.lineWidth = 3
        ctx.strokeText(textOverlay.text, textOverlay.x, textOverlay.y)
        ctx.fillText(textOverlay.text, textOverlay.x, textOverlay.y)
      }

      setPixelatedImage(canvas.toDataURL())
    }
    img.src = originalImage
  }, [originalImage, setPixelatedImage, setPalette, textOverlay])

  return <canvas ref={canvasRef} className="mx-auto border rounded-lg shadow-lg max-w-full" />
}

