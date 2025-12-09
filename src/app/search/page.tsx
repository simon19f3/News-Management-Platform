import { searchArticles } from "../lib/api";
import ArticleCard from "../../../components/ArticleCard";
import { Article } from "../lib/types";

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function SearchPage(props: Props) {
  const searchParams = await props.searchParams;
  
  // FIXED: Trim the query to avoid sending " " (space) to the API
  const query = (searchParams.q || "").trim();

  let articles: Article[] = [];
  let errorMsg = "";

  // Only call API if query has actual characters
  if (query) {
    try {
      const data = await searchArticles(query);
      articles = data.articles;
    } catch (error: any) {
      console.error("Search error:", error);
      // Display the actual error message from the API
      errorMsg = error.message || "Failed to fetch search results.";
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-foreground">
          Search Results
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          {query 
            ? `Showing results for "${query}"` 
            : "Please enter a keyword to search."}
        </p>
      </header>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-600 dark:text-red-400">
          <strong>Error:</strong> {errorMsg}
        </div>
      )}

      {/* Empty State */}
      {articles.length === 0 && query && !errorMsg ? (
        <div className="text-center py-20 text-muted-foreground">
          No articles found matching your criteria.
        </div>
      ) : (
        /* Results Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}