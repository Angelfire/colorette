type Color = {
  hex: string
  name: string
  pantone: string
  rgb: string
}

type PaletteProps = {
  colors: Color[]
  description: string
  title: string
}

export const Palette = ({ colors, description, title }: PaletteProps) => {
  return (
    <div className="mt-12 flex flex-col items-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mb-4">{description}</p>
      <div className="grid grid-cols-5 gap-5">
        {colors.map(color => (
          <div className="flex flex-col items-center">
            <div
              style={{
                backgroundColor: `${color.hex}`,
                boxShadow: `rgba(${color.rgb}, 0.3) 0px 16px 24px -8px`,
              }}
              className="mb-4 h-52 w-36 rounded-xl hover:animate-bounce"
              key={color.name}
            />
            <p
              className="text-lg font-extrabold"
              style={{ color: `${color.hex}` }}
            >
              {color.name}
            </p>
            <p className="text-xs">{color.hex}</p>
            <p className="text-xs">{color.pantone}</p>
            <p className="text-xs">{`rgb(${color.rgb})`}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
