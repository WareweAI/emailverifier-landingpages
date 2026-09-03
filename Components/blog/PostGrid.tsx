import type { BlogPost } from "@/lib/wordpress/types";
import { PostCard } from "./PostCard";

type PostGridProps = {
  posts: BlogPost[];
  emptyMessage?: string;
};

export function PostGrid({
  posts,
  emptyMessage = "No articles found.",
}: PostGridProps) {
  if (posts.length === 0) {
    return (
      <p className="rounded-2xl border border-line bg-surface p-8 text-center text-ink-muted">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
