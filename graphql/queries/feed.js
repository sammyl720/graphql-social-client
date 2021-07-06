import { COMMENT_FRAGMENT, DATE_FRAGMENT, IMAGE_FRAGMENT, POST_FRAGMENT } from '../fragments'
import {gql} from '@apollo/client'

export default FEED = gql`
  query Feed($limit: Int, $skip: Int){
    feed(limit:$limit, skip:$skip) {
      friends {
        ... postFragment
      }
      recommended {
      ...postFragment
    }
    
    popular {
      ...postFragment
    }
    }
  }
  
  ${IMAGE_FRAGMENT}
  ${DATE_FRAGMENT}
  ${COMMENT_FRAGMENT}
  ${POST_FRAGMENT}
`