interface ColorPaletteProps {
  palette: string[]
}

export function ColorPalette({ palette }: ColorPaletteProps) {
  const rgbToHex = (rgb: string) => {
    const [r, g, b] = rgb.match(/\d+/g)!.map(Number)
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3 text-white">Color Palette</h2>
      <div className="flex flex-wrap gap-3">
        {palette.map((color, index) => {
          const hex = rgbToHex(color)
          return (
            <div
              key={index}
              className="w-20 h-20 rounded-lg shadow-md transition-transform hover:scale-110 flex flex-col items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <span className="text-xs font-mono bg-black/50 text-white px-1 rounded">{hex}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

