import { ReactNode } from 'react'
import { FaFacebook, FaGithub } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'

import Image from '@/components/Image'
// import { PageSEO } from '@/components/SEO'
import { urlForImage } from '@/lib/sanity.image'
import type { Author } from '@/lib/types'

interface Props {
  children: ReactNode
  author: Author
}

export default function AuthorContainer({ children, author }: Props) {
  const { name, occupation, company, avatar, socials } = author

  return (
    <>
      {/* <PageSEO title={`About - ${name}`} description={`About me - ${name}`} /> */}
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-transparent background-author-animate bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              src={urlForImage(avatar).width(768).height(768).url()}
              alt="avatar"
              width={192}
              height={192}
              className="h-auto max-w-full align-middle border-none rounded-full shadow"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight text-transparent background-author-animate bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text">
              {name}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex pt-6 space-x-3">
              <a href={`mailto:${socials.email}`}>
                <FiMail className="w-6 h-6" title="Email" />
              </a>
              <a
                href={`https://github.com/${socials.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="w-6 h-6" title="Github" />
              </a>
              <a
                href={`https://facebook.com/${socials.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="w-6 h-6" title="Facebook" />
              </a>
              {/* <SocialIcon kind="twitter" href={twitter} /> * */}
            </div>
          </div>
          <div className="pt-8 pb-8 prose max-w-none dark:prose-dark xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}