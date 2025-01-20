"use client"

import { useState } from "react"
import { Upload } from "lucide-react"

interface ImageUploaderProps {
  setOriginalImage: (image: string) => void
}

export function ImageUploader({ setOriginalImage }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setOriginalImage(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleChange} />
      <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
        <Upload className="w-12 h-12 text-gray-400 mb-2" />
        <span className="text-gray-600">Drag and drop an image or click to upload</span>
      </label>
    </div>
  )
}

