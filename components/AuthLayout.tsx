import Head from "next/head";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
};

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Social-X</title>
        <meta name="description" content="Social-X authentication" />
      </Head>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-xl font-bold text-gray-900">Social-X</h1>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
      </div>
    </>
  );
}