import client from "../apollo";
import { POST_FRAGMENT } from "../graphql/fragments";
import { User, Post } from "../interfaces";

export const addUserPost = (user: User, post:Post) => {
  client.cache.modify({
    id: user.id,
    fields:{
      posts(existingPosts = [], {readField}){
        const newPostRef = client.cache.writeFragment({
          data: post,
          fragment: POST_FRAGMENT
        })

        if(existingPosts.some(ref => readField('id', ref) === post.id)){
          return existingPosts;
        }

        return [newPostRef, ...existingPosts]
      }
    }
  })
}