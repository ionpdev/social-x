import { SessionProvider } from "next-auth/react";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
