import { useState } from "react"

import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Paint } from "@/components/icons/Paint"
import { Palette } from "@/components/Palette"

export function Colorette() {
  const [loading, setLoading] = useState<Boolean>(false)
  const [keywords, setKeywords] = useState("")
  const [generatedPalette, setGeneratedPalette] = useState()

  const onHandleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    setKeywords("")
    setLoading(true)

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: keywords,
      }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()

    if (!data) {
      return
    }

    setLoading(false)
    setGeneratedPalette(data)
  }

  return (
    <section className="container">
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <p className="text-4xl font-semibold">Generate a new palette</p>
          <p className="mb-3 text-2xl">
            Enter the words you want to use to generate the palette
          </p>
          <Input
            className="mb-3"
            type="text"
            placeholder="beach, ocean, sunset..."
            onChange={e => setKeywords(e.target.value)}
            value={keywords}
          />
          <Button onClick={onHandleClick}>
            <Paint className="mr-2 h-4 w-4" />
            Generate palette
          </Button>
          {loading && <Paint className="mt-12 h-32 w-52 animate-pulse" />}
        </div>
      </div>
      {generatedPalette && !loading && (
        <Palette
          colors={generatedPalette.colors}
          description={generatedPalette.description}
          title={generatedPalette.title}
        />
      )}
    </section>
  )
}
