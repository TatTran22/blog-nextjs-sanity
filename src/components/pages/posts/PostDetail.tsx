import { PortableText, PortableTextReactComponents, toPlainText } from '@portabletext/react'
import Layout from 'components/BlogLayout'
import PostDetailTitle from 'components/pages/posts/PostDetailTitle'
import Pre from 'components/Pre'
import GithubSlugger from 'github-slugger'
import { urlForImage } from 'lib/sanity.image'
import type { Post } from 'lib/types'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const slugger = new GithubSlugger()
const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const BlogContentPortableComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }

      return <Image alt={value.alt || ' '} loading="lazy" src={urlForImage(value).url()} />
    },
    code: ({ value }) => <Pre value={value} />,
  },

  marks: {
    link: ({ children, value }) => {
      if (!value.href.startsWith('/')) {
        return (
          <a href={value.href} rel="noreferrer noopener" target="_blank">
            {children}
          </a>
        )
      }

      return <a href={value.href}>{children}</a>
    },
  },
  block: {
    h1: ({ children, value }) => {
      const slug = slugger.slug(toPlainText(value))
      return <h1 id={slug}>{children}</h1>
    },
    h2: ({ children, value }) => {
      const slug = slugger.slug(toPlainText(value))
      return <h2 id={slug}>{children}</h2>
    },
  },
}
export default function PostDetail(props: {
  preview?: boolean
  loading?: boolean
  data: { post: Post; morePosts: Post[] }
}) {
  const { preview, loading, data } = props
  const { post = {} as any, morePosts = [] } = data || {}

  const slug = post?.slug

  if (!slug && !preview) {
    notFound()
  }

  const { title, description, coverImage, date, authors, content } = post

  return (
    <Layout preview={preview} loading={loading}>
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString('en-US', postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PostDetailTitle>{title}</PostDetailTitle>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authors.map((author) => (
                    <li className="flex items-center space-x-2" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={urlForImage(author.avatar).width(768).height(768).url()}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="background-author-animate bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text font-semibold text-transparent">
                          {author.name}
                        </dd>
                        {/*<dt className="sr-only">Twitter</dt>*/}
                        {/*<dd>*/}
                        {/*  {author.twitter && (*/}
                        {/*    <Link*/}
                        {/*      href={author.twitter}*/}
                        {/*      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"*/}
                        {/*    >*/}
                        {/*      {author.twitter.replace(*/}
                        {/*        'https://twitter.com/',*/}
                        {/*        '@'*/}
                        {/*      )}*/}
                        {/*    </Link>*/}
                        {/*  )}*/}
                        {/*</dd>*/}
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 dark:prose-dark">
                <PortableText value={content} components={BlogContentPortableComponents} />
              </div>
              {/*<div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">*/}
              {/*  <Link href={discussUrl(slug)} rel="nofollow">*/}
              {/*    {'Discuss on Twitter'}*/}
              {/*  </Link>*/}
              {/*  {` • `}*/}
              {/*  <Link href={editUrl(slug)}>{'View on GitHub'}</Link>*/}
              {/*</div>*/}
              {/*<Comments frontMatter={content} />*/}
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}
