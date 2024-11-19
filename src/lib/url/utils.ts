export interface ParsedUrl {
  protocol: string
  host: string
  path: string
  queryParams: [string, string][]
}

export const parseUrl = (url: string): ParsedUrl | null => {
  try {
    const parsedUrl = new URL(url)
    return {
      protocol: parsedUrl.protocol,
      host: parsedUrl.host,
      path: parsedUrl.pathname,
      queryParams: Array.from(parsedUrl.searchParams.entries())
    }
  } catch (error) {
    return null
  }
}

export const compareUrls = (url1: string, url2: string): string => {
  const parsedUrl1 = parseUrl(url1)
  const parsedUrl2 = parseUrl(url2)

  if (!parsedUrl1 || !parsedUrl2) {
    return "One or both URLs are invalid."
  }

  const differences = []

  if (parsedUrl1.protocol !== parsedUrl2.protocol) {
    differences.push(
      `<span style="color: red;">Different protocols: ${parsedUrl1.protocol} vs ${parsedUrl2.protocol}</span>`
    )
  }
  if (parsedUrl1.host !== parsedUrl2.host) {
    differences.push(
      `<span style="color: red;">Different hosts: ${parsedUrl1.host} vs ${parsedUrl2.host}</span>`
    )
  }
  if (parsedUrl1.path !== parsedUrl2.path) {
    differences.push(
      `<span style="color: red;">Different paths: ${parsedUrl1.path} vs ${parsedUrl2.path}</span>`
    )
  }

  const queryParams1 = new Map(parsedUrl1.queryParams)
  const queryParams2 = new Map(parsedUrl2.queryParams)

  queryParams1.forEach((value, key) => {
    if (queryParams2.get(key) !== value) {
      differences.push(
        `<span style="color: red;">Different query parameter ${key}: ${value} vs ${queryParams2.get(
          key
        )}</span>`
      )
    }
    queryParams2.delete(key)
  })

  queryParams2.forEach((value, key) => {
    differences.push(
      `<span style="color: red;">Query parameter ${key} is missing in the first URL</span>`
    )
  })

  return differences.length > 0 
    ? differences.join(", ")
    : `<span style="color: green;"><CheckIcon /> URLs are the same</span>`
}

export const trackRedirects = async (initialUrl: string, maxRedirects = 10): Promise<string[]> => {
  const visitedUrls = [initialUrl]
  let currentUrl = initialUrl

  for (let i = 0; i < maxRedirects; i++) {
    try {
      const response = await fetch(currentUrl, { method: "HEAD", redirect: "manual" })
      if (response.status >= 300 && response.status < 400) {
        const nextUrl = response.headers.get("Location")
        if (!nextUrl) break
        const absoluteUrl = new URL(nextUrl, currentUrl).href
        if (visitedUrls.includes(absoluteUrl)) {
          visitedUrls.push(`Circular redirect detected: ${absoluteUrl}`)
          break
        }

        visitedUrls.push(absoluteUrl)
        currentUrl = absoluteUrl
      } else {
        break
      }
    } catch (error) {
      visitedUrls.push(`Error: Unable to fetch ${currentUrl}`)
      break
    }
  }

  return visitedUrls
}
