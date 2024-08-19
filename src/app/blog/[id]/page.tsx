import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";
import { getPostData, getFileNames } from "@/lib/posts";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

type Params = { params: { id: string } };

export const metadata: Metadata = {
  title: "Post page",
};

export const generateStaticParams = async () => {
  const paths = await getFileNames();
  return paths.map((id) => ({ params: { id } }));
}

const Post = async ({ params }: Params) => {
  const postData = await getPostData(params.id);

  if (postData.message === "Post not found") {
    notFound();
  }

  return (
    <div
      id="post"
      className="start-page-gradient min-h-dvh flex flex-col items-center"
    >
      <div className="w-full h-auto bg-gray-300/80 shadow-sm dark:bg-transparent min-h-[4.5rem] flex justify-between items-center px-[16px] gap-5">
        <Link href="/#blog" className="flex items-center gap-2">
          <FiArrowLeft
            size={20}
            className="inline text-accent animate-bounce-right"
          />
          Home
        </Link>
        <ThemeSwitcher />
      </div>

      <div className="max-w-screen-lg post p-16">
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </div>
    </div>
  );
};

export default Post;
