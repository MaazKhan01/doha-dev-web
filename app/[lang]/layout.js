/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-page-custom-font */
"use client";
import "../globals.css";
import { LanguageProvider } from "@/context/LanguageProvider";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { LoadingProvider } from "@/context/LoadingProvider";
import SiteShell from "@/components/layout/SiteShell";
import { use } from "react";

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")}/graphql`,
  }),
  cache: new InMemoryCache(),
});

export default function RootLayout({ children, params }) {
  const { lang } = use(params);
  const currentLang = lang || "en";

  return (
    <html lang={currentLang}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>QOC UCMS</title>
        <meta name="robots" content="index, follow" />

        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <ApolloProvider client={client}>
          <LanguageProvider>
            <LoadingProvider>
              {/* SiteShell auto-injects Navbar + Footer on every inner page.
                  The homepage is excluded — it manages its own nav/footer. */}
              <SiteShell lang={currentLang}>
                {children}
              </SiteShell>
            </LoadingProvider>
          </LanguageProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}