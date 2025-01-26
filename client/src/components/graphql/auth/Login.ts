import { gql } from '@apollo/client'

const LOGIN = gql`
    mutation($emailOrUname: String!, $pass: String!) {
        login(emailOrUname: $emailOrUname, pass: $pass)
    }
`
export default LOGIN