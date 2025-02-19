import { gql } from '@apollo/client'

export const FETCH = gql`
    query($search: String, $page: Int!) {
        collection(search: $search, page: $page) {
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
    mutation($isbn: String!) {
        remove(isbn: $isbn)
    }
`