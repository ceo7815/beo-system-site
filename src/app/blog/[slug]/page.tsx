import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/pages/article-content";
import { JsonLd } from "@/components/seo/json-ld";
import { getPost, posts } from "@/lib/blog";
import { articleJsonLd, breadcrumbJsonLd, ogImage, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "בלוג" };
  return pageMetadata({
    title: post.title.he,
    description: post.excerpt.he,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    images: [
      ogImage,
      { url: post.image, width: 1600, height: 900, alt: post.imageAlt.he },
    ],
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return (
    <>
      <JsonLd data={articleJsonLd(post, "he")} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "בלוג", path: "/blog" },
          { name: post.title.he, path: `/blog/${post.slug}` },
        ])}
      />
      <ArticleContent slug={slug} />
    </>
  );
}
