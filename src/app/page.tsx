import TopicCreateForm from "@/components/topics/TopicCreateForm";

export default async function Home() {
  return (
    <>
      <div className="flex w-full justify-between box-border px-40 py-8">
        <div>Popular Topics</div>
        <div>
          <TopicCreateForm />
        </div>
      </div>
    </>
  );
}
