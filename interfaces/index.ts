import { ApolloQueryResult, FetchResult, MutationFunctionOptions, OperationVariables, QueryLazyOptions } from "@apollo/client";

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
  gender?:"Male" | "Female" | "NonBinary" | "Unspecified"; 
}

export interface Img {
  base64: string;
  filename:string;
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

export interface EditUserInput {
  name?: string
  gender?: 'Male' |
  'Female' |
  'NonBinary' |
  'Unspecified'
  bio?: string;
  private?: Boolean;
  profile_img?: Image
}

export type Token = string | null;
export type Message = string | null;
export type ExpireTime = number | null;
export interface IState {
  loading: boolean | null;
  updateProfile?: (options?: QueryLazyOptions<OperationVariables>) => void;
  error: Message;
  message: Message;
  me: User | null;
  user: User | null;
  getPublicUser?: (options?: QueryLazyOptions<OperationVariables>) => void;
  refreshToken?: (options?: QueryLazyOptions<OperationVariables>) => void;
  refetchMe?: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
  setToken?: ({ token, expireTime: expiresIn }: { token: Token; expireTime: ExpireTime ; }) => Promise<void>,
  setLoading?: (loading: boolean) => void;
  setMessage?: (message: Message, timer?: number ) => void;
  setError?: (message: Message, timer?: number ) => void;
  logout?: () => void;
  signup?: (options?: MutationFunctionOptions<any, OperationVariables>) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  login?: (options?: MutationFunctionOptions<any, OperationVariables>) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  loadMe?: (options?: QueryLazyOptions<OperationVariables>) => void
  addPost?: (options?: MutationFunctionOptions<any, OperationVariables>) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  setUser?: (user: User | null) => void;
  setOwner?: (owner: User | null) => any;
  toggleLikePost?: (options?: MutationFunctionOptions<any, OperationVariables>) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  deletePost?: (options?: MutationFunctionOptions<any, OperationVariables>) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>
}

export interface IAction {
  type?: string;
  payload?: any;
}