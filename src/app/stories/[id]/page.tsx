import { getAllStories, getStory } from "@/lib/stories";
import { notFound } from "next/navigation";
import Story from "@/components/Story";

interface StoryPageProps {
    params: {
        id: string;
    };
}

function StoryPage({ params: { id } }: StoryPageProps) {
    const decodedId = decodeURIComponent(id);

    const story = getStory(decodedId);

    if (!story) {
        return notFound();
    }

    return <Story story={story} />;
}

export default StoryPage;

export async function generateStaticParams() {
    const stories = getAllStories();

    const paths = stories.map((story) => ({
        params: {
            id: encodeURIComponent(story.story),
        },
    }));

    return paths;
}
