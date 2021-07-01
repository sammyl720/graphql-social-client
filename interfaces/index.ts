export interface User {
  id?: string;
  name?: string;
  verified?: boolean;
  profile_img?: string;
  private?: boolean;
  followers?: User[];
  following?: User[];
  requests?:User[];
  posts?: Post[];
  date_joined?:Date; 
  email?:string;
  bio?:string;
  gender?:string; 
}

export interface Post {
  id?:string;
  text?:string;
  likeCount?:string;
  created_on?: Date;
  user?:User;
  score?: number;
  public?:boolean;
  likes?: User[];
  hash_tags?:string[]; 
}

export interface Comment {
  id?: string;
  text?: string[];
  images?: string[];
  user?: User;
  created_on?: Date;
  post?: Post;
  public?: boolean;
  likes?: User[];
  comments?: Comment[];
  hash_tags?: string[]
}

export interface Date {
  unix?:string;
  full_date?:string;
  utc?:string;
  date?:string;
  time?:string;
}