import { masterItem, postItem, postInfo, postData, dbPostItem, postMeta, postContent, dateObject } from "./types";

export function convertDate (date?: Date): dateObject {
  const newDate = date ? date : new Date();
  const dateResult = {
    dateOrigin: newDate,
    dateString: String(newDate.getFullYear()) + "-" + ("00" + (newDate.getMonth()+1)).slice(-2) + "-" + ("00" + newDate.getDate()).slice(-2),
    dateNumbner: newDate.getFullYear() + newDate.getMonth() + newDate.getDate(),
    yearString: String(newDate.getFullYear()),
    monthString: ("00" + (newDate.getMonth()+1)).slice(-2),
    dayString: ("00" + newDate.getDate()).slice(-2),
    yearNumbner: newDate.getFullYear(),
    monthNumbner: newDate.getMonth()+1,
    dayNumbner: newDate.getDate(),
  }
  return dateResult;
}

export function calNextID (itemList: masterItem[]): number {
  const idList: number[] = (itemList as Array<masterItem>).map(item => item.id);
  const maxID: number = Math.max(...idList);
  return (maxID + 1);
}

export function getMasterNameByID (id: Number, list: Array<masterItem>) {
  const target = list.find(item => item.id === id);
  return target ? target.name : '';
}

export function getMasterIDByName (name: String, list: Array<masterItem>): number {
  const target = list.find(item => item.name === name);
  return target ? target.id : 0;
}

export function getPostByID (id: String, list: Array<postItem>): postItem {
  const target = list.find(item => item.id === id);
  const empty: postItem = {
    id: '',
    title: '',
    description: '',
    thumbnail: '',
    date: '',
    category: 0,
    tag: [0],
    content: {
      time: convertDate().dateNumbner,
      blocks:[],
      version:''
    }
  }
  return target ? target : empty;
}

export function getPostInfo (post: postItem): postInfo {
  const postInfo: postInfo = {
    id: post.id,
    title: post.title,
    description: post.description,
    thumbnail: post.thumbnail,
    date: post.date,
    category: post.category,
    tag: post.tag
  }
  return postInfo;
}

export function convertPost (postDB: any): postItem[] {
  let result = [];
  for (const [key, dbPostData] of Object.entries(postDB)) {
    const tempPostData: postData = dbPostData as postData;
    const tempPostID = {id: key}
    const tempPostItem: postItem = Object.assign(tempPostID, tempPostData);
    result.push(tempPostItem);
  }
  return result;
}

export function post2DB (post: postItem): dbPostItem {
  const { id, ...rest } = post;
  const result = {
    target: post.id,
    data: rest
  }
  return result;
}

export function mapPostItem (id: string, post: postData): postItem {
  const result = Object.assign({id: id}, post);
  return result;
}

export function createPostObj (id: string, meta: postMeta, content: postContent): postItem {
  const result = Object.assign({content: content, id: id}, meta);
  return result;
}