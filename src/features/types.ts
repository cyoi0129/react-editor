export interface masterItem {
  id: number,
  name: string
}

export interface postMeta {
  title: string,
  description: string,
  thumbnail: string,
  date: string,
  category: number,
  tag: number[]
}

export interface postInfo extends postMeta {
  id: number | null;
}

export interface postData extends postMeta {
  content: {
    time: number,
    blocks:[],
    version: string
  }
}

export interface postItem extends postData {
  id: number | null;
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