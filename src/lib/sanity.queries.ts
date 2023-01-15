import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  title,
  date,
  excerpt,
  categories[]->{title},
  coverImage,
  "slug": slug.current,
  "author": author->{name, avatar, slug},
`

const authorFields = groq`
  _id,
  name,
  "slug": slug.current,
  avatar,
  bio,
  occupation,
  company,
  socials,
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export const postUpdatedQuery = `*[_type == "post" && _id == $id].slug.current`

const snippetFields = `
  _id,
  title,
  description,
  logo,
  "slug": slug.current,
`

export const allSnippetsQuery = `
*[_type == "snippet"] | order(date desc, _updatedAt desc) {
  ${snippetFields}
}`

export const snippetsQuery = `
{
  "snippet": *[_type == "snippet" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${snippetFields}
  }
}`

export const snippetSlugsQuery = `
*[_type == "snippet" && defined(slug.current)][].slug.current
`

export const snippetBySlugQuery = `
*[_type == "snippet" && slug.current == $slug][0] {
  ${snippetFields}
}
`
// all fields
export const getAuthorQuery = groq`
*[_type == "author" && slug.current == $slug][0] {
  ${authorFields}
}
`