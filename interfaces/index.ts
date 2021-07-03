export interface User {
  __typename: 'User';
  id?: string;
  name?: string;
  verified?: boolean;
  profile_img?: Image;
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
  __typename: 'Post';
  id?:string;
  text?:string;
  likeCount?:string;
  created_on?: Date;
  user?:User;
  score?: number;
  public?:boolean;
  comments?: Comment[]
  images?: Image[];
  likes?: User[];
  hash_tags?:string[]; 
}

export interface Comment {
  __typename: 'Comment';
  id?: string;
  text?: string[];
  images?: Image[];
  user?: User;
  created_on?: Date;
  post?: Post;
  public?: boolean;
  likes?: User[];
  comments?: Comment[];
  hash_tags?: string[]
}

export interface Date {
  __typename: 'Date';
  unix?:string;
  full_date?:string;
  utc?:string;
  date?:string;
  time?:string;
}

export interface Image {
    __typename: 'Image';
   id?: string;
   asset_id?: string;
   public_id?:string;
   url?: string;
   secure_url?:string;
   format?: string;
   resource_type?:string;
   created_at?:string;
}