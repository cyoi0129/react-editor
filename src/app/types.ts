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

export interface fileItem {
  name: string,
  url: string
}

export interface fileList {
  files: fileItem[] | [];
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

export interface userLoginData {
  email: string,
  password: string
}

export interface userInfoData {
  displayName: string|null|undefined,
  email: string|null|undefined,
  uid: string|null|undefined,
  refreshToken: string|null|undefined,
  photoURL: string|null|undefined
}

export interface userStatus {
  isLogined: boolean,
  isLoginError: boolean,
  userLogin: userLoginData,
  userInfo: userInfoData
}

export interface userUpdateData {
  displayName: string,
  photoURL: string
}

export interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

export interface EditorProps {
  content: {
    time: number,
    blocks: [],
    version: string
  };
  changeContent: any;
}

export interface NoticeProps {
  show: boolean,
  type: 'success' | 'error',
  message: string
}

export interface LoadingProps {
  show: boolean
}

export interface ListedItemProps {
  data: masterItem;
  removeMaster: any;
  changeMaster: any;
}

export interface PostInfoProps {
  postInfo: postInfo;
  changePostInfo: any;
}

export interface PostItemProps {
  data: postItem;
}

export interface ImageListProps {
  show: boolean,
  close: any,
  changeImage: any
}