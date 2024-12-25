import Link from "next/link";
import { db } from "@/db";
import { Chip } from "@nextui-org/chip";
import paths from "@/paths";

const TopicList = async () => {
  const topicsData = await db.topic.findMany();

  const topics = topicsData.map((topic) => (
    <Link key={topic.id} href={paths.topicShow(topic.slug)}>
      <Chip color="warning" className="text-white">
        {topic.slug}
      </Chip>
    </Link>
  ));

  return <div className="flex gap-2 flex-wrap justify-center">{topics}</div>;
};

export default TopicList;
