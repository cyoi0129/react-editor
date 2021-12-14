import { masterItem, postItem, postData, postInfo } from "../features/types";

// Date format process object
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

export function getMasterNameByID (id: Number, list: Array<masterItem>): string {
  const target = list.find(item => item.id === id);
  return target ? target.name : 'No Item';
}

export function getMasterIDByName (name: String, list: Array<masterItem>): number {
  const target = list.find(item => item.name === name);
  return target ? target.id : 0;
}

export function getPostByID (id: Number, list: Array<postItem>): postItem {
  const target = list.find(item => item.id === id);
  const empty: postItem = {
    id: 0,
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