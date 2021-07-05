import { gql, makeVar } from '@apollo/client'

console.log(`Enviroment: ${process.browser ? 'CSR' : 'SSR' }`)

export const memoryToken = makeVar<null|string>(null)
export const expireTime = makeVar<null|number>(null)

export const GET_TOKEN = gql`
  query GetToken {
    token: String @client
    expireTime: Int @client
  }
`
