export interface masterItem {
  id: number,
  name: string
}

export interface masterList {
  categories: masterItem[] | [],
  tags: masterItem[] | []
}

export interface postMeta {
  title: string,
  description: string,
  thumbnail: string,
  date: string,
  category: number,
  tag: number[]
}

export interface postData extends postMeta{
  content: {
    time: number,
    blocks:[],
    version: string
  }
}

export interface postItem extends postData {
  id: string
}

export interface postInfo extends postMeta {
  id: string
}

export interface postList {
  posts: postItem[] | []
}

export interface dbPostItem {
  target: string,
  data: postData
}