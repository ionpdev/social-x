import { useSession } from "next-auth/react";
import Link from "next/link";
import MainLayout from "../components/MainLayout";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [postContent, setPostContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    setIsSubmitting(true);
    try {
      // Here you would call your GraphQL mutation to create a post
      console.log("Creating post:", postContent);
      // Reset the form after successful submission
      setPostContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sample posts data (would come from your API in a real app)
  const samplePosts = [
    {
      id: "1",
      content: "Just launched my new project!",
      user: { name: "Alice", email: "alice@example.com" },
      createdAt: "2023-06-15T10:30:00Z",
    },
    {
      id: "2",
      content: "Learning Next.js and GraphQL has been an amazing journey.",
      user: { name: "Bob", email: "bob@example.com" },
      createdAt: "2023-06-14T15:45:00Z",
    },
    {
      id: "3",
      content: "What are your favorite React hooks?",
      user: { name: "Charlie", email: "charlie@example.com" },
      createdAt: "2023-06-13T08:20:00Z",
    },
  ];

  return (
    <MainLayout title="Home">
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : session ? (
        <div className="max-w-2xl mx-auto">
          {/* Post creation form */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <form onSubmit={handleSubmitPost}>
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold mr-3">
                  {session.user?.name?.charAt(0) ||
                    session.user?.email?.charAt(0)}
                </div>
                <div className="flex-1">
                  <textarea
                    className="w-full border-0 focus:ring-0 text-lg placeholder-gray-400 tracking-wide min-h-[80px] resize-none"
                    placeholder="What's happening?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    maxLength={280}
                  ></textarea>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex space-x-2 text-blue-500">
                      <button
                        type="button"
                        className="p-2 rounded-full hover:bg-blue-50"
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
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded-full hover:bg-blue-50"
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
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-3">
                        {postContent.length}/280
                      </span>
                      <button
                        type="submit"
                        disabled={!postContent.trim() || isSubmitting}
                        className="bg-blue-500 text-white rounded-full px-5 py-2 font-medium disabled:opacity-50"
                      >
                        {isSubmitting ? "Posting..." : "Post"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Posts feed */}
          <div className="space-y-4">
            {samplePosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm p-4 hover:bg-gray-50 transition"
              >
                <div className="flex">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
                    {post.user.name.charAt(0)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <span className="font-medium">{post.user.name}</span>
                      <span className="text-gray-500 text-sm ml-2">
                        @{post.user.email.split("@")[0]}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        · {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-900">{post.content}</p>
                    <div className="mt-3 flex items-center space-x-8 text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-blue-500">
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
                            strokeWidth={1.5}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>12</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-500">
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
                            strokeWidth={1.5}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        <span>4</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-red-500">
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
                            strokeWidth={1.5}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        <span>8</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to Social-X</h2>
            <p className="text-gray-600 mb-6">
              Join the conversation, connect with others, and share your
              thoughts.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/auth/signin"
                className="bg-blue-500 text-white rounded-full px-6 py-2 font-medium hover:bg-blue-600"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-white text-blue-500 border border-blue-500 rounded-full px-6 py-2 font-medium hover:bg-blue-50"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
