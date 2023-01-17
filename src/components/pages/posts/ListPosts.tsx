import { Suspense } from 'react'

import Layout from '@/components/BlogLayout'
import ContainerHeader from '@/components/ContainerHeader'
import PostCard from '@/components/pages/posts/PostCard'
import type { Post } from '@/lib/types'

interface BlogPostsProps {
  posts: Post[]
  preview?: boolean
  loading?: boolean
}

export default function BlogPosts(props: BlogPostsProps) {
  const { preview, loading, posts } = props

  return (
    <Layout preview={preview} loading={loading}>
      <Suspense fallback={null}>
        <div className="divide-y">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <ContainerHeader title="All Posts" />
            <div className="relative max-w-lg">
              <input
                aria-label="Search articles"
                type="text"
                // onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles"
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
              <svg
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <ul>
            {posts.map((post) => (
              <PostCard key={post.title} post={post} />
            ))}
          </ul>
        </div>
      </Suspense>
    </Layout>
  )
}