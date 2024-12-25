"use server";

import { z } from "zod";
import { auth } from "@/auth";
import type { Topic } from "@prisma/client";
import { db } from "@/db";
import { redirect } from "next/navigation";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

//zod form schema
const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, { message: "Must be lowercase letters" }),
  description: z.string().min(10),
});

//error type
interface formStateType {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[]; //This is for general errors like if user is not signed in and etc...
  };
}

export async function createTopic(
  formState: formStateType,
  formData: FormData
): Promise<formStateType> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  //form errors
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  //for general errors _form
  const session = await auth();

  if (!session?.user || !session) {
    return {
      errors: {
        _form: ["You Must Sign In to Create a Topic"],
      },
    };
  }

  //if everything is successfull topic give topic type
  let topic: Topic;

  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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
          _form: ["Something Went Wrong..."],
        },
      };
    }
  }

  //revalidate homepage so the changes are displayed
  revalidatePath(paths.home());
  redirect(paths.topicShow(topic.slug));
}
