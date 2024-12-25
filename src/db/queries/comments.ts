import type { Comment } from "@prisma/client";
import { db } from "@/db";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  return db.comment.findMany({
    where: {
      postId: postId, //Once again this way it is easy to read
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}
