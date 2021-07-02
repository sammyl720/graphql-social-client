import { gql } from '@apollo/client'

export const IMAGE_FRAGMENT = gql`
  fragment image on Image  {
    url
    id
    public_id
    secure_url
  }
`

export const DATE_FRAGMENT = gql`
fragment date on Date {
  date
  time
  full_date
  unix
}
`