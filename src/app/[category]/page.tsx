import CategoryClient from "../../../components/CategoryClient";

// Next.js 15: params is a Promise
interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  // 1. Await the params on the server
  const resolvedParams = await params;
  
  // 2. Pass the data to the Client Component
  // This allows the Client Component to use the 'useNews' hook
  return <CategoryClient category={resolvedParams.category} />;
}