import TopicCreateForm from "@/components/topics/TopicCreateForm";
import TopicList from "@/components/topics/TopicList";
import { Divider } from "@nextui-org/divider";

export default async function Home() {
  return (
    <>
      <div className="flex w-full justify-between box-border px-40 py-8">
        <div>Popular Topics</div>
        <div className="flex flex-col gap-2 max-w-[250px] shadow-generalShadow box-border p-4 rounded-md">
          <TopicCreateForm />
          <Divider />
          <h1 className="text-center font-titleFont font-semibold text-2xl">
            Topics
          </h1>
          <TopicList />
        </div>
      </div>
    </>
  );
}
