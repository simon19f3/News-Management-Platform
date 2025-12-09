import ArticleDetailClient from "../../../components/ArticleDetailClient";
import { Suspense } from "react";

// Update the type definition: searchParams is a Promise
interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

// 1. Make the component async
export default async function ArticlePage(props: Props) {
  // 2. Await the searchParams before accessing properties
  const searchParams = await props.searchParams;
  
  const id = searchParams.id ?? "";
  const category = searchParams.category ?? "general";

  return (
    <Suspense fallback={<div className="p-10 text-center">Loading article...</div>}>
      <ArticleDetailClient id={id} category={category} />
    </Suspense>
  );
}