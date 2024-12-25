import type { PostWithData } from "@/db/queries/posts";
import Link from "next/link";
import paths from "@/paths";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error("Need a slug to link to a post");
    }

    return (
      <div
        key={post.id}
        className="shadow-generalShadow box-border py-2 px-6 w-fit rounded-md"
      >
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="text-2xl font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xl text-gray-400">By {post.user.name}</p>
            <p className="text-xl text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
