import {gql} from '@apollo/client' 
module.exports = gql`
    directive @ensureAuth on FIELD_DEFINITION

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on FIELD_DEFINITION | OBJECT | INTERFACE

  type Query {
    hello(name: String): String
    me: UserOrError
    user(id: ID!): UserOrError
    posts(userId: ID!): [PostOrError]!

    # find users, posts and comments with required text field (String) and optional limit field (Int)
    #
    #
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    #
    # returns a FindResults object with arrays of users, posts, comments
    find(data: FindInput): FindResult!
  }

  type Mutation {
    # Login with fields (email: String, password: String)
    #
    # returns a Token object (with a token field) on Success
    #
    # returns a Error object on error
    #
    # Error has a message field and a errors array field
    login(data: LoginInput): TokenOrError!

    # Signup with fields (email: String, password: String)
    #
    # returns a Token object (with a token field) on Success .
    #
    # returns a Error object on error
    #
    # Error has a message field and a errors array field
    signup(data: SignupInput): TokenOrError!

    # add a post with required data field of text (String)
    #
    # additional optional fields:
    #
    # 	. public: Boolean (indicates if the post can be viewed by anyone or not) default: true
    #
    # 	. images: [String] (an array of url/base64 images) will change to a more dynamic field in the future
    #
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    #
    # returns the created Post object on success
    #
    # return an Error object on failure
    addPost(data: AddPostInput): PostOrError!

    # update authenticated user's profile
    #
    # all fields are optional
    #
    # optional fields
    #
    # 	 name: String
    #
    # 	 gender:Gender  a enum 'option' of values(Male, Female, NonBinary, Unspecified)
    #
    # 	 profile_img: String (will update to a more dynamic type in future)
    #
    # 	 bio: String
    #
    # 	 private: Boolean
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    updateProfile(data: updateProfileInput): SuccessOrError!

    # Add comment to a 'Post' type
    #
    # required fields: (postId: ID!, text: String)
    #
    # option fields: (images: [String], public:Boolean)
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    #
    # returns the created Comment object on success
    #
    # return an Error object on failure
    addCommentToPost(data: AddPostCommentInput): CommentOrError!

    # Add comment to a 'Comment' type
    #
    # required fields: (commentId: ID!, text: String)
    #
    # option fields: (images: [String], public:Boolean)
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    #
    # returns the created Comment object on success
    #
    # return an Error object on failure
    addComment(data: AddCommentInput): CommentOrError!

    # delete a post with required field of id (ID!)
    #
    # additional optional fields:
    #
    #
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    #
    # returns a Success object with a status field on success
    #
    # return an Error object on failure
    deletePost(id: ID!): SuccessOrError!

    # delete a comment with required field of id (ID!)
    #
    # additional optional fields:
    #
    #
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    #
    # returns a Success object with a status field on success
    #
    # return an Error object on failure
    deleteComment(id: ID!): SuccessOrError!

    # like or unlike a given post
    #
    # required field: (id:ID!) - post id
    #
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    #
    # returns a Success object with a status field on success
    #
    # return an Error object on failure
    toggleLikePost(id: ID!): SuccessOrError!

    # like or unlike a given comment
    #
    # required field: (id:ID!) - comment id
    #
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    #
    # returns a Success object with a status field on success
    #
    # return an Error object on failure
    toggleLikeComment(id: ID!): SuccessOrError!

    # follow a user with required data field of userId(ID!)
    #
    #
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    #
    # returns a Success object with a status field on success
    #
    # return an Error object on failure
    follow(userId: ID!): SuccessOrError!

    # unfollow a user with required data field of userId(ID!)
    #
    #
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    #
    # returns a Success object with a status field on success
    #
    # return an Error object on failure
    unfollow(userId: ID!): SuccessOrError!

    # approve a user follow request with required data field of userId(ID!)
    #
    # side note: This only applies to users who have their profile private setting set to true
    #
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    #
    # returns a Success object with a status field on success
    #
    # return an Error object on failure
    addFollow(userId: ID!): SuccessOrError!

    # Request to reset your password (email: String!)
    #
    # and email will be sent with a link to reset password
    #
    # returns a Success object (with a status field) on Success .
    #
    # returns a Error object on error
    #
    # Error has a message field and a errors array field
    sendResetRequest(email: String!): SuccessOrError!

    # update authenticated user's password
    #
    # a password (String field) is required
    #
    # a Authorization header with a 'Bearer <token>' value is required to access this mutation
    resetPassword(password: String!): SuccessOrError!
  }

  enum Gender {
    Male
    Female
    NonBinary
    Unspecified
  }

  type User {
    verified: Boolean
    id: ID!
    private: Boolean
    email: String!
    name: String
    bio: String
    gender: Gender!
    profile_img: String
    date_joined: Date
    last_login: Date
    requests: [User]
    followers: [User]
    following: [User]
    posts: [Post]
  }

  type Error {
    message: String!
    errors: [String]
  }

  type Post {
    id: ID!
    text: String!
    created_on: Date
    user: User!
    images: [String]
    public: Boolean
    likes: [User!]
    hash_tags: [String]
    comments: [Comment!]
  }

  type Comment {
    id: ID!
    text: String!
    images: [String]
    user: User!
    created_on: Date
    post: Post!
    public: Boolean!
    likes: [User!]
    comments: [Comment]
    hash_tags: [String]
  }

  type Token {
    token: String!
  }

  type Success {
    status: String!
  }

  type Date {
    unix: String
    full_date: String
    utc: String
    date: String
    time: String
  }

  type FindResult {
    users: [User]!
    posts: [Post]!
    comments: [Comment]!
  }

  input AddPostInput {
    text: String!
    images: [String]
    public: Boolean
  }

  input AddPostCommentInput {
    postId: ID!
    text: String!
    images: [String]
    public: Boolean
  }

  input AddCommentInput {
    commentId: ID!
    text: String!
    images: [String]
    public: Boolean
  }

  input LoginInput {
    email: String
    password: String
  }

  input SignupInput {
    name: String!
    email: String!
    password: String!
  }

  input updateProfileInput {
    name: String
    gender: Gender
    profile_img: String
    bio: String
    private: Boolean
  }

  input FindInput {
    text: String!
    limit: Int
  }

  union UserOrError = User | Error

  union PostOrError = Post | Error

  union CommentOrError = Comment | Error

  union TokenOrError = Token | Error

  union SuccessOrError = Success | Error

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  # The Upload scalar type represents a file upload.
  scalar Upload

`