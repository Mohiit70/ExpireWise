"use client"

import { useState } from "react"
import { ImageUploader } from "./ImageUploader"
import { PixelArtCanvas } from "./PixelArtCanvas"
import { ColorPalette } from "./ColorPalette"
import { EffectsLibrary } from "./EffectsLibrary"
import { ExportOptions } from "./ExportOptions"
import { TextOverlay } from "./TextOverlay"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function PixelArtTransformer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [pixelatedImage, setPixelatedImage] = useState<string | null>(null)
  const [palette, setPalette] = useState<string[]>([])
  const [textOverlay, setTextOverlay] = useState({ text: "", x: 0, y: 0 })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900">Pixel Art Transformer</h1>
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com/yourusername/pixel-art-transformer" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6" />
            </a>
          </Button>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ImageUploader setOriginalImage={setOriginalImage} />
          {originalImage && (
            <>
              <PixelArtCanvas
                originalImage={originalImage}
                setPixelatedImage={setPixelatedImage}
                setPalette={setPalette}
                textOverlay={textOverlay}
              />
              <ColorPalette palette={palette} />
              <EffectsLibrary pixelatedImage={pixelatedImage} setPixelatedImage={setPixelatedImage} />
              <TextOverlay setTextOverlay={setTextOverlay} />
              <ExportOptions pixelatedImage={pixelatedImage} textOverlay={textOverlay} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

