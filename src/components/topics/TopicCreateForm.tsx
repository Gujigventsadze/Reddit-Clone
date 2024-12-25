"use client";
import { useActionState, startTransition } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import * as actions from "@/actions";
import FormButton from "../common/FormButton";

const TopicCreateForm = () => {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: {},
  });

  //For some reason when you first write something wrong and then correctly it does not let you go on. WILL FIX LATER
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
        <Button className="text-white font-titleFont" color="success">
          Create Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full shadow-generalShadow">
        <form className="box-border p-4 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <h1 className="text-center font-titleFont text-xl">Create Topic</h1>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Enter Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Enter a description"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="bg-red-400 text-white box-border px-2 py-1 rounded-md font-titleFont">
                {formState.errors._form}
              </div>
            ) : null}
            <FormButton isLoading={isPending}>Create</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default TopicCreateForm;
