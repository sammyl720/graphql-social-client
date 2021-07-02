
import { gql } from 'graphql-tag'
const ADD_POST = gql`
mutation AddPost($text: [String!], $images: [ImageInput], $public: Boolean ){
  addPost(data: { text: $text, images: $images, public: $public}){
    ... on Post{
      text
      likeCount
      created_on {
        unix
        full_date
      }
      id
      images {
        url
        id
        secure_url
        created_at
        public_id
      }
    }
    ... on Error{
      message
      errors
    }
  }
  
}
`


export default ADD_POST;