export interface Post {
  postName: string;
  postTitle: string;
  postDate: Date;
  postTag: string[];
  postImage: string[];
}

export interface GeneralPost {
  techPosts: Post[];
  generalPosts: Post[];
}
