import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PlaceholderPage
      title="Story"
      description={`Story reader for "${slug}" — comic/lullaby/video player arrives in a later step.`}
    />
  );
}
