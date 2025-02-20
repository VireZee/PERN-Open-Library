import { gql } from '@apollo/client'

export const FETCH = gql`
    query($search: String, $page: Int!) {
        collection(search: $search, page: $page) {
            found
            collection {
                author_key
                cover_edition_key
                cover_i
                title
                author_name
            }
            totalCollection
        }
    }
`
export const REMOVE = gql`
    mutation($author_key: [String!]!, $cover_edition_key: String!, $cover_i: Int!) {
        remove(author_key: $author_key, cover_edition_key: $cover_edition_key, cover_i: $cover_i)
    }
`