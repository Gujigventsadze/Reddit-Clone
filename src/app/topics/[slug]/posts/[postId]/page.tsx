import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import PostShow from "@/components/posts/post-show";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

const PostShowPage = async ({ params }: PostShowPageProps) => {
  const { postId } = await params;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[50%]">
        <PostShow postId={postId} />
        <CommentCreateForm postId={postId} startOpen />
        <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
      </div>
    </div>
  );
};

export default PostShowPage;
