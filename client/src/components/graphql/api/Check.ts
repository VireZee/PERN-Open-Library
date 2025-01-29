import { gql } from '@apollo/client'

const CHECK = gql`
    query($user_id: ID!) {
        checkApiKey(user_id: $user_id)
    }
`
export default CHECK