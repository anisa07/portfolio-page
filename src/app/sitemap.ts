import { getFileNames } from '@/lib/posts';
import type { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const posts = await getFileNames();
   
   const postsSitemap: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post}`,
   }))

  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL ?? "",
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...postsSitemap,
  ]
}