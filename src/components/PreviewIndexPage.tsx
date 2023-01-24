'use client'

import IndexPage from 'components/pages/homepage/IndexPage'
import { usePreview } from 'lib/sanity.preview'
import { indexQuery, settingsQuery } from 'lib/sanity.queries'
import type { Post, Settings } from 'lib/types'

export default function PreviewIndexPage({ token }: { token: null | string }) {
  const posts: Post[] = usePreview(token, indexQuery) || []
  const settings: Settings = usePreview(token, settingsQuery) || {}

  return <IndexPage preview posts={posts} settings={settings} />
}
