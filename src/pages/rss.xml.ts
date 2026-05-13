import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET() {
  const blog = await getCollection('blog');
  
  return rss({
    stylesheet: '/rss-styles.xsl',
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    title: 'Hiddendomain',
    description: 'The human side of the internet.',
    site: 'https://hiddendoma.in',
    items: blog
        .filter(post => post.data.status == 'published')
        .map((post) => {
            const updated = post.data.date_updated ? new Date(post.data.date_updated) : new Date(post.data.date_created);
            return {
            title: post.data.title,
            pubDate: post.data.date_created,
            description: post.data.seo_text ?? post.data.content,
            link: `/blog/${post.id}/`,
            customData: `
                <atom:updated>${updated.toUTCString()}</atom:updated>
            `,
            }
    }),
  });
}