import ListPosts from '@/components/pages/blog/ListPosts'
import { getAllPosts } from '@/lib/sanity.client'

export default async function Blog({ params }: { params: { slug: string } }) {
  const [posts] = await Promise.all([getAllPosts()])

  return (
    <>
      <ListPosts posts={posts} />
    </>
  )
}

// FIXME: remove the `revalidate` export below once you've followed the instructions in `/pages/api/revalidate.ts`
export const revalidate = 1