import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col justify-center items-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Pixel Art Transformer
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          Transform your images into stunning pixel art with our AI-powered tool. Apply effects, generate color
          palettes, and create unique designs with ease.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Link href="/transform">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/yourusername/pixel-art-transformer" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <FeatureCard
          title="AI-Powered Transformations"
          description="Leverage cutting-edge AI to enhance your pixel art creations."
        />
        <FeatureCard
          title="Smart Color Palettes"
          description="Generate harmonious color schemes tailored to your images."
        />
        <FeatureCard
          title="Advanced Effects"
          description="Apply a variety of effects to give your pixel art unique styles."
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2 text-blue-600">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

