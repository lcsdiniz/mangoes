import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const anilist = new HttpLink({
  uri: 'https://graphql.anilist.co',
})

const hygraph = new HttpLink({
  uri: import.meta.env.VITE_HYGRAPH_ENDPOINT,
})

const authLink = setContext((_, { headers }) => {
  const token = import.meta.env.VITE_ANILIST_AUTH_TOKEN

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});



export const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === 'hygraph',
    hygraph,
    authLink.concat(anilist)
),
  cache: new InMemoryCache(),
})