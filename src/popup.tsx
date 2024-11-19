import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { UrlParser } from "@/components/url/UrlParser"
import { UrlComparer } from "@/components/url/UrlComparer"
import "~style.css"

function IndexPopup() {
  const [url, setUrl] = useState("")
  const [url1, setUrl1] = useState("")
  const [url2, setUrl2] = useState("")

  return (
    <div className="plasmo-flex plasmo-w-[30rem] plasmo-bg-gray-300">
      <Tabs defaultValue="tab1" className="plasmo-flex plasmo-flex-col plasmo-p-8 plasmo-w-full">
        <TabsList className="plasmo-flex plasmo-w-full plasmo-bg-gray-200 plasmo-rounded-t-lg">
          <TabsTrigger value="tab1" className="plasmo-flex-grow plasmo-text-center plasmo-text-black plasmo-hover:bg-gray-300 plasmo-transition-colors">
            URL Parser
          </TabsTrigger>
          <TabsTrigger value="tab2" className="plasmo-flex-grow plasmo-text-center plasmo-text-black plasmo-hover:bg-gray-300 plasmo-transition-colors">
            URL Compare
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tab1" className="plasmo-bg-white plasmo-p-6 plasmo-rounded-lg plasmo-shadow-md">
          <UrlParser url={url} setUrl={setUrl} />
        </TabsContent>

        <TabsContent value="tab2" className="plasmo-bg-white plasmo-p-6 plasmo-rounded-lg plasmo-shadow-md">
          <UrlComparer url1={url1} setUrl1={setUrl1} url2={url2} setUrl2={setUrl2} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default IndexPopup