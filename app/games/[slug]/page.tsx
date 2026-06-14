import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <PlaceholderPage
      title="Game"
      description={`Canvas mini-game shell for "${slug}" arrives in a later step.`}
    />
  );
}
