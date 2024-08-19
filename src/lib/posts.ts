import path from "path";
import fs from "fs";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/data/posts");

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    return {
      id,
      contentHtml: "",
      message: "Post not found",
    };
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    message: "Post found",
    ...matterResult.data,
  };
}

export async function getFileNames() {
  const fullPath = path.join(postsDirectory);
  const fileNames: string[] = []

  fs.readdirSync(fullPath).forEach(file => {
    fileNames.push(file.replace('.md', ''));
  });

  return fileNames;
}