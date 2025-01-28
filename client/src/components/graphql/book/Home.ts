import { gql } from '@apollo/client'

export const FETCH = gql`
    query($user_id: ID!, $isbn: String!) {
        fetch(user_id: $user_id, isbn: $isbn) {
            isbn
            added
        }
    }
`
export const ADD = gql`
    mutation($user_id: ID!, $cover_i: Int!, $isbn: String!, $title: String!, $author_name: String!) {
        add(user_id: $user_id, cover_i: $cover_i, isbn: $isbn, title: $title, author_name: $author_name)
    }
`