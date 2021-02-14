import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  if (token) {
    return {
      headers: {
        authorization: 'Bearer ' + token,
      },
    }
  }
})

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000',
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Tweet: {
        keyFields: ['id', 'created_at'],
      },
    },
  }),
})

export default client
