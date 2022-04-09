export type ThemeConfig = {
  text?: string
  name: string
}[]

export type HeaderConfig = {
  nav?: {
    text: string
    link?: string
    children?: {
      text: string
      link: string
    }[]
  }[]
  search?: {
    provider: 'google' | 'duckduckgo'
    colors?: boolean
  }
}

export type FooterConfig = {
  nav?: {
    text: string
    link: string
  }[]
  html?: string
  since?: string
}

export type DateConfig = {
  toPublishedString: { locales: string; options: Intl.DateTimeFormatOptions }
  toUpdatedString: { locales: string; options: Intl.DateTimeFormatOptions }
}

export type FeedConfig = {
  /** feed entry limit, `0` is unlimited. */
  limit: number
  /** WebSub (formerly PubSubHubbub) hubs. one per line */
  hub?: string[]
}
