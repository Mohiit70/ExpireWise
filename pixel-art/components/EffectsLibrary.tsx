"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface EffectsLibraryProps {
  pixelatedImage: string | null
  setPixelatedImage: (image: string) => void
}

export function EffectsLibrary({ pixelatedImage, setPixelatedImage }: EffectsLibraryProps) {
  const [loading, setLoading] = useState(false)
  const [previewEffect, setPreviewEffect] = useState<string | null>(null)
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null)

  const applyEffect = async (effect: string) => {
    if (!pixelatedImage) return

    setLoading(true)
    setSelectedEffect(effect)

    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Could not get canvas context")

      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        switch (effect) {
          case "sepia":
            applySepiaEffect(ctx, canvas.width, canvas.height)
            break
          case "grayscale":
            applyGrayscaleEffect(ctx, canvas.width, canvas.height)
            break
          case "inverted":
            applyInvertEffect(ctx, canvas.width, canvas.height)
            break
          case "neon":
            applyNeonEffect(ctx, canvas.width, canvas.height)
            break
        }

        const resultImage = canvas.toDataURL()
        setPreviewEffect(resultImage)
        setLoading(false)
      }
      img.src = pixelatedImage
    } catch (error) {
      console.error("Error applying effect:", error)
      setLoading(false)
    }
  }

  const confirmEffect = () => {
    if (previewEffect) {
      setPixelatedImage(previewEffect)
      setPreviewEffect(null)
      setSelectedEffect(null)
    }
  }

  const applySepiaEffect = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189)
      data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168)
      data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131)
    }
    ctx.putImageData(imageData, 0, 0)
  }

  const applyGrayscaleEffect = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = avg
      data[i + 1] = avg
      data[i + 2] = avg
    }
    ctx.putImageData(imageData, 0, 0)
  }

  const applyInvertEffect = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]
      data[i + 1] = 255 - data[i + 1]
      data[i + 2] = 255 - data[i + 2]
    }
    ctx.putImageData(imageData, 0, 0)
  }

  const applyNeonEffect = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * 1.5)
      data[i + 1] = Math.min(255, data[i + 1] * 1.5)
      data[i + 2] = Math.min(255, data[i + 2] * 1.5)
    }
    ctx.putImageData(imageData, 0, 0)
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3 text-indigo-900">Effects Library</h2>
      <div className="flex flex-wrap gap-3 mb-4">
        {["sepia", "grayscale", "inverted", "neon"].map((effect) => (
          <Button
            key={effect}
            onClick={() => applyEffect(effect)}
            disabled={loading}
            variant={selectedEffect === effect ? "default" : "outline"}
          >
            {effect.charAt(0).toUpperCase() + effect.slice(1)}
          </Button>
        ))}
      </div>
      {previewEffect && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-indigo-900">Effect Preview</h3>
          <img
            src={previewEffect || "/placeholder.svg"}
            alt="Effect Preview"
            className="max-w-full h-auto rounded-lg mb-2"
          />
          <div className="flex gap-2">
            <Button onClick={confirmEffect}>Apply Effect</Button>
            <Button variant="outline" onClick={() => setPreviewEffect(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

