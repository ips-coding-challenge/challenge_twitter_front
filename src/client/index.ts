import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { formatValidationErrors } from '../utils/utils'

const link = onError(({ graphQLErrors, networkError, forward, operation }) => {
  if (graphQLErrors) {
    // if (graphQLErrors[0].message === 'Argument Validation Error') {
    //    formatValidationErrors(graphQLErrors)
    // }
    // graphQLErrors.map(({ message, locations, path, extensions }) =>
    //   console.log(
    //     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
    //   )
    // )
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000',
})

const client = new ApolloClient({
  link: from([link, httpLink]),
  cache: new InMemoryCache(),
})

export default client
