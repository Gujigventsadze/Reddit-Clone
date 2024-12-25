import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const TopicShowPage = async ({ params }: TopicShowPageProps) => {
  const { slug } = await params;

  return (
    <div className="w-full flex justify-between box-border py-12 px-24">
      <div className="flex flex-col gap-2">
        <h1 className="font-titleFont text-3xl font-bold mb-6">
          {slug} Topics
        </h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
};

export default TopicShowPage;
