import Head from "next/head";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
  title?: string;
};

export default function MainLayout({
  children,
  title = "Home",
}: MainLayoutProps) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <Head>
        <title>{title} | Social-X</title>
        <meta
          name="description"
          content="Social-X - A modern social platform"
        />
      </Head>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left sidebar - navigation */}
        <div className="w-64 border-r border-gray-200 bg-white fixed h-full">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-blue-500">Social-X</h1>
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg mx-2"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2"
                    />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg mx-2"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Explore
                </Link>
              </li>
              {session && (
                <>
                  <li>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg mx-2"
                    >
                      <svg
                        className="w-6 h-6 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {session && (
            <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
                  {session.user?.name?.charAt(0) ||
                    session.user?.email?.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    {session.user?.name || session.user?.email}
                  </p>
                </div>
                <button
                  onClick={() => signOut()}
                  className="ml-auto text-red-500 hover:text-red-600"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="ml-64 flex-1">
          {/* Top header */}
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div>
          </header>

          {/* Main content area */}
          <main className="p-6">{children}</main>
        </div>

        {/* Right sidebar - trending/suggestions */}
        <div className="w-80 border-l border-gray-200 bg-white fixed right-0 h-full p-4 hidden lg:block">
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-xl mb-4">What's happening</h3>
            <div className="space-y-4">
              <div className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                <p className="text-xs text-gray-500">Trending in Technology</p>
                <p className="font-medium">#SocialX</p>
                <p className="text-xs text-gray-500">1,234 posts</p>
              </div>
              <div className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                <p className="text-xs text-gray-500">Trending in Design</p>
                <p className="font-medium">#UXDesign</p>
                <p className="text-xs text-gray-500">892 posts</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-bold text-xl mb-4">Who to follow</h3>
            <div className="space-y-4">
              <div className="flex items-center hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-medium">Alice</p>
                  <p className="text-xs text-gray-500">@alice</p>
                </div>
                <button className="ml-auto bg-black text-white rounded-full px-4 py-1 text-sm font-medium">
                  Follow
                </button>
              </div>
              <div className="flex items-center hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500 font-bold">
                  B
                </div>
                <div className="ml-3">
                  <p className="font-medium">Bob</p>
                  <p className="text-xs text-gray-500">@bob</p>
                </div>
                <button className="ml-auto bg-black text-white rounded-full px-4 py-1 text-sm font-medium">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
