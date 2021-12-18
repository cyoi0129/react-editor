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

export interface postContent {
  time: number,
  blocks:[],
  version: string
}

export interface postData extends postMeta {
  content: postContent
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

export interface dateObject {
  dateOrigin: Date,
  dateString: string,
  dateNumbner: number,
  yearString: string,
  monthString: string,
  dayString: string,
  yearNumbner: number,
  monthNumbner: number,
  dayNumbner: number,
}

export interface userStatus {
  isLogined: boolean,
  email: string,
  password: string
}