export type Manga = {
  id: number
  staff: Staff
  coverImage: {
    large: string
  }
  bannerImage?: string
  description?: string
  title: {
    english: string
    romaji: string
  }
}

type Staff = {
  nodes: {
    name: {
      full: string
    }
  }[]
}