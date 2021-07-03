
import { gql } from 'graphql-tag'
import { COMMENT_FRAGMENT, DATE_FRAGMENT, IMAGE_FRAGMENT, POST_FRAGMENT } from '../fragments'
const ADD_POST = gql`
mutation AddPost($text: [String!], $images: [ImageInput], $public: Boolean ){
  addPost(data: { text: $text, images: $images, public: $public}){
    ... on Post{
      ... postFragment
    }
    ... on Error{
      errors
      message
    }
  }
}
${POST_FRAGMENT}
${DATE_FRAGMENT}
${IMAGE_FRAGMENT}
${COMMENT_FRAGMENT}
`


export default ADD_POST;