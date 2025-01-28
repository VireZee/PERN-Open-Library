import { gql } from '@apollo/client'

export const FETCH = gql`
    query($user_id: ID!, $search: String, $page: Int!) {
        collection(user_id: $user_id, search: $search, page: $page) {
            found
            collection {
                cover_i
                isbn
                title
                author_name
            }
            totalCollection
        }
    }
`
export const REMOVE = gql`
    mutation($user_id: ID!, $isbn: String!) {
        remove(user_id: $user_id, isbn: $isbn)
    }
`