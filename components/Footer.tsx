import { Beer } from "@/components/icons/Beer"

export function Footer() {
  return (
    <footer className="border-t border-t-slate-200">
      <div className="container py-4">
        <p className="flex flex-row gap-1 text-sm">
          Made with <Beer className="h-4 w-4" /> in Colombia
        </p>
      </div>
    </footer>
  )
}
