import { Input } from "@/components/ui/input"
import { ClearButton } from "./ClearButton"
import { compareUrls } from "@/lib/url/utils"

interface UrlComparerProps {
  url1: string
  setUrl1: (url: string) => void
  url2: string
  setUrl2: (url: string) => void
}

export const UrlComparer = ({ url1, setUrl1, url2, setUrl2 }: UrlComparerProps) => {
  return (
    <div className="plasmo-relative">
      <div className="plasmo-relative plasmo-mb-4">
        <Input
          type="text"
          value={url1}
          onChange={(e) => setUrl1(e.target.value)}
          placeholder="Enter first URL"
          className="plasmo-p-3 plasmo-border plasmo-border-gray-300 plasmo-rounded-lg plasmo-focus:border-gray-400 plasmo-transition-colors plasmo-pr-10"
        />
        <ClearButton onClick={() => setUrl1("")} />
      </div>
      <div className="plasmo-relative plasmo-mb-4">
        <Input
          type="text"
          value={url2}
          onChange={(e) => setUrl2(e.target.value)}
          placeholder="Enter second URL"
          className="plasmo-p-3 plasmo-border plasmo-border-gray-300 plasmo-rounded-lg plasmo-focus:border-gray-400 plasmo-transition-colors plasmo-pr-10"
        />
        <ClearButton onClick={() => setUrl2("")} />
      </div>
      <p
        className="plasmo-text-black"
        dangerouslySetInnerHTML={{ __html: compareUrls(url1, url2) }}
      />
    </div>
  )
}