import { gql } from '@apollo/client'

const SETTINGS = gql`
    mutation($user_id: ID!, $photo: String!, $name: String!, $uname: String!, $email: String!, $oldPass: String, $newPass: String, $rePass: String, $show: Boolean!) {
        settings(user_id: $user_id, photo: $photo, name: $name, uname: $uname, email: $email, oldPass: $oldPass, newPass: $newPass, rePass: $rePass, show: $show)
    }
`
export default SETTINGS