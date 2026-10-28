import { useEffect } from "react"
import { site } from "../content"

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title === site.name ? site.name : `${title} · ${site.name}`
  }, [title])
}
