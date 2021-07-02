import { gql } from "@apollo/client";

const SEND_RESET_REQUEST = gql`
  mutation SendResetRequest($email: String!){
    sendResetRequest(email:$email){
      ... on Success {
        status
      }
      ... on Error {
        message
        errors
      }
    }
  }
`

export default SEND_RESET_REQUEST;