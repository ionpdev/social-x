import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import "../../styles/globals.css";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
