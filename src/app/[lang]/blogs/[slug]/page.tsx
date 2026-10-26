import ElaborateBlog from "@/components/ElaborateBlog/ElaborateBlog.view";
import PageNotFound from "@/components/ui/NotFound.view";
import { getApprovedBlogBySlug } from "@/utils/server-api";

// export const metadata = {
//   title: "Blogs | Kabbik",
//   description: "Learn more about Kabbik and our story.",
// };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getApprovedBlogBySlug(slug);
  const metaData = {
    title: blog.data?.meta_title,
    description: blog.data?.meta_description,
    keywords: blog.data?.meta_keywords
      .split(", ")
      .map((word: string) => word.trim()),
    authors: [{ name: blog.data?.meta_author }],
  };
  return metaData;
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getApprovedBlogBySlug(slug);
  const blog = data.data;
  return !blog ? <PageNotFound /> : <ElaborateBlog blog={blog} />;
}
