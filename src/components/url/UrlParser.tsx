import { Input } from "@/components/ui/input"
import { ClearButton } from "./ClearButton"
import { parseUrl } from "@/lib/url/utils"

interface UrlParserProps {
  url: string
  setUrl: (url: string) => void
}

export const UrlParser = ({ url, setUrl }: UrlParserProps) => {
  const parsedUrl = parseUrl(url)

  return (
    <div className="plasmo-relative">
      <Input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        className="plasmo-mb-4 plasmo-p-3 plasmo-border plasmo-border-gray-300 plasmo-rounded-lg plasmo-focus:border-gray-400 plasmo-transition-colors plasmo-pr-10"
      />
      <ClearButton onClick={() => setUrl("")} />
      {parsedUrl && (
        <div className="plasmo-text-black">
          <p>Protocol: {parsedUrl.protocol}</p>
          <p>Host: {parsedUrl.host}</p>
          <p>Path: {parsedUrl.path}</p>
          <p>Query Parameters:</p>
          <ul className="plasmo-list-disc plasmo-list-inside">
            {parsedUrl.queryParams.map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}