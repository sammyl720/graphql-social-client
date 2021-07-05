import {gql} from '@apollo/client'

const REFRESH_TOKEN = gql`
  {
    refresh {
      ... on Token{
        token
        expireTime
      }
      
      ... on Error {
        message
        errors
      }
    }
  }
`

export default REFRESH_TOKEN;