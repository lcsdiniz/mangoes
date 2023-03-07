import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client";
const anilist = new HttpLink({
  uri: 'https://graphql.anilist.co',
})
const hygraph = new HttpLink({
  uri: import.meta.env.VITE_HYGRAPH_ENDPOINT,
})

export const client = new ApolloClient({
  link: ApolloLink.split(
    operation => operation.getContext().clientName === 'hygraph',
    hygraph,
    anilist
),
  cache: new InMemoryCache(),
})