import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'

export const getTodosQuery = gql`
    query todos {
        todos {
            id
            title
            content
        }
    }
`

export const useTodosQuery = (): QueryResult => useQuery(getTodosQuery)


