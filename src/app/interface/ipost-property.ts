export interface Post {
  postName: string;
  postTitle: string;
  postDate: Date;
}

export interface GeneralPost {
  techPosts: Post[];
  generalPosts: Post[];
}