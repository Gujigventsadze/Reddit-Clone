"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { useActionState, startTransition } from "react";
import * as actions from "@/actions";
import FormButton from "../common/FormButton";

interface PostCreateFormProps {
  slug: string;
}

const PostCreateForm = ({ slug }: PostCreateFormProps) => {
  const [formData, action, isPending] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <Popover placement="left" className="w-[300px]">
      <PopoverTrigger>
        <Button color="success" className="font-titleFont text-white">
          Create Post
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <form
          className="flex flex-col gap-4 w-full box-border px-2 py-4"
          onSubmit={handleSubmit}
        >
          <h1 className="font-titleFont text-2xl font-semibold text-center">
            Create Post
          </h1>
          <Input
            name="title"
            label="Title"
            labelPlacement="outside"
            placeholder="Add title"
            isInvalid={!!formData.errors.title}
            errorMessage={formData.errors.title?.join(", ")}
          />
          <Textarea
            name="description"
            label="Description"
            labelPlacement="outside"
            placeholder="Add description"
            isInvalid={!!formData.errors.description}
            errorMessage={formData.errors.description?.join(", ")}
          />
          {formData.errors._form && (
            <div className="bg-red-500 text-white font-titleFont box-border py-1 px-2 rounded-md">
              {formData.errors._form.join(", ")}
            </div>
          )}
          <FormButton isLoading={isPending}>Create</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default PostCreateForm;
