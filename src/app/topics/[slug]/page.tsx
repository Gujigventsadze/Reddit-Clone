import PostCreateForm from "@/components/posts/PostCreateForm";

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const TopicShowPage = async ({ params }: TopicShowPageProps) => {
  const { slug } = await params;

  return (
    <div className="w-full flex justify-between box-border py-12 px-24">
      <div>{slug}</div>
      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
};

export default TopicShowPage;
