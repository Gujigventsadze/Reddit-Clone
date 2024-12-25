"use server";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import type { Post } from "@prisma/client";
import paths from "@/paths";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface formStateType {
  errors: {
    title?: string[];
    description?: string[];
    _form?: string[];
  };
}

const createPostSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
});

export async function createPost(
  slug: string,
  formState: formStateType,
  formData: FormData
): Promise<formStateType> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must sign in to create a post"],
      },
    };
  }

  const topic = await db.topic.findFirst({
    where: { slug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["No such topic found"],
      },
    };
  }

  let post: Post;

  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.description,
        topicId: topic.id,
        userId: session.user.id!,
        //userId "!" is used because data shows error that it can be undefined however we check it on top so idk why its happening
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        errors: {
          _form: [e.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Unknown error occured"],
        },
      };
    }
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
