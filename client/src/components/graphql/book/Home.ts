import { gql } from '@apollo/client'

export const FETCH = gql`
    query($isbn: String!) {
        fetch(isbn: $isbn) {
            isbn
            added
        }
    }
`
export const ADD = gql`
    mutation($cover_i: Int!, $isbn: String!, $title: String!, $author_name: String!) {
        add(cover_i: $cover_i, isbn: $isbn, title: $title, author_name: $author_name)
    }
`