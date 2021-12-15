export interface masterItem {
  id: number,
  name: string
}

export interface postInfo {
  id: number
  title: string,
  description: string,
  thumbnail: string,
  date: string,
  category: number,
  tag: number[]
}

export interface postItem extends postInfo {
  content: {
    time: number,
    blocks:[],
    version: string
  }
}

export interface categoryList {
  categories: masterItem[] | []
}

export interface tagList {
  tags: masterItem[] | []
}

export interface postList {
  posts: postItem[] | []
}