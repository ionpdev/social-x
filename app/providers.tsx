"use client";

import { SessionProvider } from "next-auth/react";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import { ReactNode } from "react";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
});

export function Providers({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </SessionProvider>
  );
}
