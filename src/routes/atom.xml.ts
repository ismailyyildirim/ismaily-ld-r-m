import type { RequestHandlerOutput } from '@sveltejs/kit'
import { site } from '$lib/config/site'
import { feed } from '$lib/config/general'
import { icon } from '$lib/config/icon'
import { genPosts, genTags } from '$lib/utils/posts'

const render = async (
  posts = genPosts({ postHtml: true }).filter((_, index) => feed.limit === 0 || index < feed.limit)
): Promise<string> => `<?xml version='1.0' encoding='utf-8'?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${site.protocol + site.domain}/</id>
  <title><![CDATA[${site.title}]]></title>
  ${site.subtitle ? `<subtitle><![CDATA[${site.subtitle}]]></subtitle>` : ''}
  ${icon.favicon ? `<icon>${icon.favicon.src}</icon>` : ''}
  <link href="${site.protocol + site.domain}" />
  <link href="${site.protocol + site.domain}/atom.xml" rel="self" type="application/atom+xml" />
  ${feed?.hub ? feed.hub.map(hub => `<link href="${hub}" rel="hub"/>`).join('\n') : ''}
  <updated>${new Date().toJSON()}</updated>
  <author>
    <name><![CDATA[${site.author.name}]]></name>
  </author>
  ${genTags(posts)
    .map(tag => `<category term="${tag}" scheme="${site.protocol + site.domain}/?tags=${encodeURI(tag)}" />`)
    .join('\n')}
  ${posts
    .map(
      post => `<entry>
    <title type="html"><![CDATA[${post.title}]]></title>
    <link href="${site.protocol + site.domain + post.path}" />
    <id>${site.protocol + site.domain + post.path}</id>
    <published>${new Date((post.date ??= '2021-11-01')).toJSON()}</published>
    <updated>${new Date(post.lastmod ?? post.date).toJSON()}</updated>
    ${post.layout === 'article' && post.descr ? `<summary type="html"><![CDATA[${post.descr.toString()}]]></summary>` : ''}
    <content type="html">
      <![CDATA[${post.html}]]>
    </content>
    ${
      post.tags &&
      post.tags
        .map(tag => `<category term="${tag}" scheme="${site.protocol + site.domain}/?tags=${encodeURI(tag)}" />`)
        .join('\n')
    }
  </entry>`
    )
    .join('\n')}
</feed>`

export const get = async (): Promise<RequestHandlerOutput> => ({
  headers: {
    'Content-Type': 'application/atom+xml; charset=utf-8'
  },
  body: await render()
})
